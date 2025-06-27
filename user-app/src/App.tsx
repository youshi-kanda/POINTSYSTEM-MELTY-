import { useState, useEffect } from 'react';
import { mockUser, mockStores, Store, categoryNames, priceRangeNames } from './data/mockStoreData';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { useIsMobile } from './hooks/use-mobile';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Phone, 
  Navigation, 
  Filter,
  Store as StoreIcon,
  Heart,
  History,
  Settings,
  Coins,
  Award,
  Menu,
  X
} from 'lucide-react';
import './App.css';

function App() {
  const isMobile = useIsMobile();
  const [selectedDistance, setSelectedDistance] = useState(3);
  const [filteredStores, setFilteredStores] = useState<Store[]>(mockStores);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState('any');
  const [statusFilter, setStatusFilter] = useState('any');
  const [priceFilter, setPriceFilter] = useState('any');
  const [accessibilityFilters, setAccessibilityFilters] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState('東京都新宿区西新宿1-1-1');
  const [userLatitude, setUserLatitude] = useState<number | null>(null);
  const [userLongitude, setUserLongitude] = useState<number | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const distanceOptions = [
    { value: 0.5, label: '500m' },
    { value: 1, label: '1km' },
    { value: 3, label: '3km' },
    { value: 5, label: '5km' }
  ];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ja-JP').format(num);
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: any } = {
      restaurant: '🍽️',
      retail: '🛍️',
      service: '💅',
      entertainment: '🎭',
      health: '🏥',
      education: '📚'
    };
    return iconMap[category] || '🏪';
  };

  const getStatusDisplay = (store: Store) => {
    return store.status === 'open' ? '営業中' : '営業時間外';
  };

  const getStatusColor = (store: Store) => {
    return store.status === 'open' ? 'text-green-600' : 'text-red-600';
  };

  const getPriceDisplay = (priceRange: string) => {
    const displays: { [key: string]: string } = {
      budget: '￥',
      moderate: '￥￥',
      expensive: '￥￥￥',
      luxury: '￥￥￥￥'
    };
    return displays[priceRange] || '￥';
  };

  const getMapUrl = () => {
    const defaultLat = 35.6811979;
    const defaultLng = 139.7647499;
    const lat = userLatitude || defaultLat;
    const lng = userLongitude || defaultLng;
    const zoom = userLatitude ? 15 : 13.1;
    
    return `https://www.google.com/maps/embed/v1/view?key=AIzaSyA0sIJoIzT0Z6Bsj3Sw6LEh0_tLixgxMpY&center=${lat},${lng}&zoom=${zoom}&maptype=roadmap&language=ja&region=jp`;
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleAccessibilityChange = (feature: string, checked: boolean) => {
    if (checked) {
      setAccessibilityFilters([...accessibilityFilters, feature]);
    } else {
      setAccessibilityFilters(accessibilityFilters.filter(f => f !== feature));
    }
  };

  const getCurrentLocation = () => {
    setShowLocationModal(true);
    
    if (!navigator.geolocation) {
      console.error('Geolocation not supported');
      alert('お使いのブラウザは位置情報サービスをサポートしていません。手動で住所を入力してください。');
      setShowLocationModal(false);
      showManualLocationInput();
      return;
    }

    console.log('Starting geolocation request...');

    let isCompleted = false;

    const backupTimeout = setTimeout(() => {
      if (!isCompleted) {
        console.log('Backup timeout triggered - geolocation API not responding');
        isCompleted = true;
        setShowLocationModal(false);
        alert('位置情報の取得がタイムアウトしました。\n\n手動で住所を入力してください。');
        showManualLocationInput();
      }
    }, 8000); // 8 second backup timeout

    const options = {
      enableHighAccuracy: false,
      timeout: 6000,
      maximumAge: 300000
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        if (isCompleted) return;
        isCompleted = true;
        clearTimeout(backupTimeout);
        
        console.log('Geolocation success:', position);
        const { latitude, longitude } = position.coords;
        
        setUserLatitude(latitude);
        setUserLongitude(longitude);
        
        try {
          console.log('Fetching address for coordinates:', latitude, longitude);
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ja`
          );
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('Address data received:', data);
          
          const address = data.display_name || `緯度: ${latitude.toFixed(4)}, 経度: ${longitude.toFixed(4)}`;
          setCurrentLocation(address);
          console.log('Location updated to:', address);
          alert(`現在地を取得しました: ${address}`);
        } catch (error) {
          console.error('住所の取得に失敗しました:', error);
          const fallbackLocation = `緯度: ${latitude.toFixed(4)}, 経度: ${longitude.toFixed(4)}`;
          setCurrentLocation(fallbackLocation);
          console.log('Using fallback location:', fallbackLocation);
          alert(`現在地を取得しました: ${fallbackLocation}`);
        }
        
        setShowLocationModal(false);
        performSearch();
      },
      (error) => {
        if (isCompleted) return;
        isCompleted = true;
        clearTimeout(backupTimeout);
        
        console.error('位置情報の取得に失敗しました:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        
        let errorMessage = '';
        let showManualInput = false;
        
        switch (error.code) {
          case 1: // PERMISSION_DENIED
            errorMessage = '位置情報の使用が拒否されました。\n\nブラウザの設定で位置情報を許可するか、手動で住所を入力してください。\n\n【位置情報を許可する方法】\n1. ブラウザのアドレスバー左側の鍵マークをクリック\n2. 「位置情報」を「許可」に変更\n3. ページを再読み込みして再度お試しください';
            console.log('Permission denied by user');
            showManualInput = true;
            break;
          case 2: // POSITION_UNAVAILABLE
            errorMessage = '位置情報が利用できません。GPS信号が弱いか、位置情報サービスが無効になっている可能性があります。\n\n手動で住所を入力してください。';
            console.log('Position unavailable');
            showManualInput = true;
            break;
          case 3: // TIMEOUT
            errorMessage = '位置情報の取得がタイムアウトしました。\n\nネットワーク環境が不安定か、位置情報サービスの応答が遅い可能性があります。\n\n手動で住所を入力してください。';
            console.log('Geolocation timeout');
            showManualInput = true;
            break;
          default:
            errorMessage = `位置情報の取得中にエラーが発生しました。(エラーコード: ${error.code})\n\n手動で住所を入力してください。`;
            console.log('Unknown geolocation error');
            showManualInput = true;
            break;
        }
        
        alert(errorMessage);
        setShowLocationModal(false);
        
        if (showManualInput) {
          showManualLocationInput();
        }
      },
      options
    );
  };

  const showManualLocationInput = () => {
    const userInput = prompt(
      '現在地を手動で入力してください:\n\n例: 東京都新宿区西新宿1-1-1\n例: 渋谷駅\n例: 東京タワー',
      '東京都新宿区西新宿1-1-1'
    );
    
    if (userInput && userInput.trim()) {
      const location = userInput.trim();
      setCurrentLocation(location);
      console.log('Manual location set to:', location);
      alert(`現在地を設定しました: ${location}`);
      performSearch();
    }
  };

  const performSearch = () => {
    setIsSearching(true);
    
    setTimeout(() => {
      const filtered = mockStores.filter(store => {
        if (store.distance > selectedDistance) return false;
        
        if (selectedCategories.length > 0) {
          if (!selectedCategories.includes(store.category)) return false;
        }
        
        if (ratingFilter !== 'any') {
          const minRating = parseFloat(ratingFilter.replace('+', ''));
          if (store.rating < minRating) return false;
        }
        
        if (statusFilter !== 'any') {
          if (statusFilter === 'open' && store.status !== 'open') return false;
          if (statusFilter === '24h' && !store.hours.includes('24:00')) return false;
        }
        
        if (priceFilter !== 'any') {
          if (store.priceRange !== priceFilter) return false;
        }
        
        if (accessibilityFilters.length > 0) {
          const hasRequiredFeature = accessibilityFilters.some(feature =>
            store.features.includes(feature)
          );
          if (!hasRequiredFeature) return false;
        }
        
        return true;
      }).sort((a, b) => a.distance - b.distance);
      
      setFilteredStores(filtered);
      setIsSearching(false);
    }, 800);
  };

  useEffect(() => {
    performSearch();
  }, [selectedDistance, selectedCategories, ratingFilter, statusFilter, priceFilter, accessibilityFilters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden mr-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            {/* User Info - Hide on mobile */}
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {mockUser.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{mockUser.name}</div>
                  <div className="text-sm text-gray-500">
                    会員ID: {mockUser.memberId} | {mockUser.location}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                <Coins className="h-5 w-5 text-blue-600" />
                <span className="font-bold text-blue-600">{formatNumber(mockUser.points)} pt</span>
              </div>
            </div>

            {/* Logo */}
            <div className="flex items-center space-x-2">
              <StoreIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <span className="text-lg sm:text-2xl font-bold text-blue-600">biid StoreConnect</span>
            </div>

            {/* Desktop Navigation - Hide on mobile */}
            <nav className="hidden lg:flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">店舗検索</a>
              <a href="#" className="text-gray-500 hover:text-blue-600 flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>お気に入り</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 flex items-center space-x-1">
                <History className="h-4 w-4" />
                <span>履歴</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 flex items-center space-x-1">
                <Settings className="h-4 w-4" />
                <span>設定</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Map Section - Always at top */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  <span>近くのbiid加盟店</span>
                </CardTitle>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs sm:text-sm">
                  {filteredStores.length}件
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 sm:h-80 lg:h-96 bg-gray-100 rounded-lg overflow-hidden relative">
                <iframe
                  src={getMapUrl()}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                
                {/* Map Pins Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {filteredStores.slice(0, 8).map((store, index) => {
                    const positions = [
                      { top: '25%', left: '35%' }, { top: '45%', left: '55%' }, 
                      { top: '35%', left: '25%' }, { top: '55%', left: '45%' },
                      { top: '30%', left: '65%' }, { top: '65%', left: '35%' },
                      { top: '40%', left: '75%' }, { top: '70%', left: '25%' }
                    ];
                    const pos = positions[index];
                    
                    return (
                      <div
                        key={store.id}
                        className="absolute transform -translate-x-1/2 -translate-y-full pointer-events-auto cursor-pointer"
                        style={{ top: pos.top, left: pos.left }}
                        onClick={() => setSelectedStore(store)}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg ${
                          store.biidPartner ? 'bg-blue-600' : 'bg-gray-500'
                        }`}>
                          {getCategoryIcon(store.category)}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded mt-1 whitespace-nowrap">
                          {store.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Filter Toggle */}
        {isMobile && (
          <div className="mb-4">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 min-h-[44px]"
            >
              <Filter className="h-4 w-4" />
              <span>フィルター {showFilters ? '非表示' : '表示'}</span>
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className={`lg:col-span-1 ${isMobile && !showFilters ? 'hidden' : ''}`}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>検索条件</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Location Button */}
                <Button 
                  onClick={getCurrentLocation}
                  className="w-full bg-blue-600 hover:bg-blue-700 min-h-[44px]"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  現在地を取得
                </Button>

                {/* Distance Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    検索範囲
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {distanceOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={selectedDistance === option.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDistance(option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Current Location Display */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm">
                    <div className="font-medium">現在地:</div>
                    <div className="text-gray-600">{currentLocation}</div>
                    <div className="font-medium mt-2">検索範囲:</div>
                    <div className="text-gray-600">半径{selectedDistance}km以内</div>
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリー
                  </label>
                  <div className="space-y-2">
                    {Object.entries(categoryNames).map(([key, name]) => (
                      <label key={key} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(key)}
                          onChange={(e) => handleCategoryChange(key, e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    評価
                  </label>
                  <select
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="any">指定なし</option>
                    <option value="4.5">4.5以上</option>
                    <option value="4.0">4.0以上</option>
                    <option value="3.5">3.5以上</option>
                    <option value="3.0">3.0以上</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    営業状況
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="any">指定なし</option>
                    <option value="open">営業中のみ</option>
                    <option value="24h">24時間営業</option>
                  </select>
                </div>

                {/* Price Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    価格帯
                  </label>
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="any">指定なし</option>
                    {Object.entries(priceRangeNames).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>

                {/* Accessibility Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    アクセシビリティ
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={accessibilityFilters.includes('wheelchair')}
                        onChange={(e) => handleAccessibilityChange('wheelchair', e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">車椅子対応</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={accessibilityFilters.includes('parking')}
                        onChange={(e) => handleAccessibilityChange('parking', e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">駐車場あり</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={accessibilityFilters.includes('wifi')}
                        onChange={(e) => handleAccessibilityChange('wifi', e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">Wi-Fi完備</span>
                    </label>
                  </div>
                </div>

                {/* Search Button */}
                <Button 
                  onClick={performSearch}
                  disabled={isSearching}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      検索中...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      この条件で検索
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Store List */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <StoreIcon className="h-5 w-5 text-green-600" />
                  <span>店舗一覧</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredStores.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🏪</div>
                    <h3 className="text-lg font-bold mb-2">条件に合う店舗が見つかりません</h3>
                    <p className="text-gray-600">検索条件を調整してみてください</p>
                  </div>
                ) : (
                  <div className="space-y-4 pb-20 lg:pb-4">
                    {filteredStores.map((store) => (
                      <div key={store.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                          <div className="flex items-center space-x-4 sm:block sm:space-x-0">
                            <div className="relative">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg ${
                                store.biidPartner ? 'bg-blue-600' : 'bg-gray-500'
                              }`}>
                                {getCategoryIcon(store.category)}
                              </div>
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                store.status === 'open' ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                            </div>
                            
                            <div className="sm:hidden">
                              <h3 className="font-bold text-lg">{store.name}</h3>
                              <div className="flex flex-wrap gap-1 mt-1">
                                <Badge variant="outline" className="text-xs">{categoryNames[store.category as keyof typeof categoryNames]}</Badge>
                                <Badge variant="secondary" className="text-xs">{getPriceDisplay(store.priceRange)}</Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="hidden sm:block">
                              <h3 className="font-bold text-lg">{store.name}</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline">{categoryNames[store.category as keyof typeof categoryNames]}</Badge>
                                <Badge variant="secondary">{getPriceDisplay(store.priceRange)}</Badge>
                                {store.biidPartner && (
                                  <Badge className="bg-blue-100 text-blue-800">
                                    <Award className="h-3 w-3 mr-1" />
                                    biid加盟店
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 space-y-1 sm:space-y-0 text-sm text-gray-600">
                              <span className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span>{store.rating} ({store.reviews}件)</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4 text-red-500" />
                                <span>{store.distance}km</span>
                              </span>
                              <span className={`flex items-center space-x-1 ${getStatusColor(store)}`}>
                                <Clock className="h-4 w-4" />
                                <span>{getStatusDisplay(store)}</span>
                              </span>
                            </div>
                            
                            <p className="text-sm text-gray-600 mt-1">{store.address}</p>
                            
                            {store.biidPartner && store.pointsEarned && (
                              <div className="flex items-center space-x-2 mt-2">
                                <Coins className="h-4 w-4 text-blue-600" />
                                <span className="text-sm text-blue-600 font-medium">
                                  獲得ポイント: {formatNumber(store.pointsEarned)}pt (還元率: {store.pointsRate}%)
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-row sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2">
                            <Button size="sm" className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 min-h-[44px]">
                              詳細を見る
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 sm:flex-none min-h-[44px]">
                              地図で確認
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-semibold">メニュー</span>
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="mt-4">
              <div className="space-y-2 px-4">
                <a href="#" className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                  <Search className="h-5 w-5" />
                  <span>店舗検索</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                  <Heart className="h-5 w-5" />
                  <span>お気に入り</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                  <History className="h-5 w-5" />
                  <span>履歴</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                  <Settings className="h-5 w-5" />
                  <span>設定</span>
                </a>
              </div>
              
              {/* Mobile User Info */}
              <div className="mt-6 px-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {mockUser.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{mockUser.name}</div>
                      <div className="text-sm text-gray-500">ID: {mockUser.id}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                    <Coins className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">
                      {formatNumber(mockUser.points)} pt
                    </span>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-40">
        <div className="flex justify-around items-center py-2">
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 py-3">
            <Search className="h-5 w-5" />
            <span className="text-xs">検索</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 py-3">
            <Heart className="h-5 w-5" />
            <span className="text-xs">お気に入り</span>
          </Button>
          <Button 
            onClick={getCurrentLocation}
            className="bg-blue-600 hover:bg-blue-700 rounded-full p-3"
          >
            <Navigation className="h-6 w-6 text-white" />
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 py-3">
            <History className="h-5 w-5" />
            <span className="text-xs">履歴</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 py-3">
            <Settings className="h-5 w-5" />
            <span className="text-xs">設定</span>
          </Button>
        </div>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <Navigation className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">位置情報を取得中...</h3>
              <p className="text-gray-600 mb-4">より正確な店舗検索のため、現在地を取得します</p>
              
              <div className="flex justify-center mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              
              <p className="text-sm text-gray-500">位置情報の取得には数秒かかる場合があります</p>
              
              <Button 
                variant="outline" 
                className="mt-4 min-h-[44px]"
                onClick={() => setShowLocationModal(false)}
              >
                キャンセル
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Store Detail Modal */}
      {selectedStore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <div className="text-center flex-1">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-2 ${
                  selectedStore.biidPartner ? 'bg-blue-600' : 'bg-gray-500'
                }`}>
                  {getCategoryIcon(selectedStore.category)}
                </div>
                <h3 className="font-bold text-lg">{selectedStore.name}</h3>
                <p className="text-gray-600">{categoryNames[selectedStore.category as keyof typeof categoryNames]}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedStore(null)}
              >
                ✕
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>評価</span>
                </span>
                <span>{selectedStore.rating} ({selectedStore.reviews}件)</span>
              </div>
              
              <div className="flex justify-between">
                <span className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span>距離</span>
                </span>
                <span>{selectedStore.distance}km</span>
              </div>
              
              <div className="flex justify-between">
                <span className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>営業</span>
                </span>
                <span className={getStatusColor(selectedStore)}>{getStatusDisplay(selectedStore)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="flex items-center space-x-1">
                  <Phone className="h-4 w-4 text-green-500" />
                  <span>電話</span>
                </span>
                <span>{selectedStore.phone}</span>
              </div>
              
              {selectedStore.biidPartner && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">biid加盟店特典</span>
                  </div>
                  <div className="text-sm text-blue-700">
                    ポイント還元率: {selectedStore.pointsRate}%
                  </div>
                  {selectedStore.pointsEarned && (
                    <div className="text-sm text-blue-700">
                      これまでの獲得ポイント: {formatNumber(selectedStore.pointsEarned)}pt
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex space-x-2 mt-6">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 min-h-[44px]">
                詳細を見る
              </Button>
              <Button variant="outline" className="flex-1 min-h-[44px]">
                基本情報
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
