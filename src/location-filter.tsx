import React, { useState, useEffect } from 'react';

const LocationFilter = () => {
  // ドロップダウンの参照を作成
  const dropdownRef = React.useRef(null);
  // 都道府県リスト
  const prefectures = [
    { id: 1, name: '北海道' },
    { id: 2, name: '青森県' },
    { id: 3, name: '岩手県' },
    { id: 4, name: '宮城県' },
    { id: 5, name: '秋田県' },
    { id: 6, name: '山形県' },
    { id: 7, name: '福島県' },
    { id: 8, name: '茨城県' },
    { id: 9, name: '栃木県' },
    { id: 10, name: '群馬県' },
    { id: 11, name: '埼玉県' },
    { id: 12, name: '千葉県' },
    { id: 13, name: '東京都' },
    { id: 14, name: '神奈川県' },
    { id: 15, name: '新潟県' },
    { id: 16, name: '富山県' },
    { id: 17, name: '石川県' },
    { id: 18, name: '福井県' },
    { id: 19, name: '山梨県' },
    { id: 20, name: '長野県' },
    { id: 21, name: '岐阜県' },
    { id: 22, name: '静岡県' },
    { id: 23, name: '愛知県' },
    { id: 24, name: '三重県' },
    { id: 25, name: '滋賀県' },
    { id: 26, name: '京都府' },
    { id: 27, name: '大阪府' },
    { id: 28, name: '兵庫県' },
    { id: 29, name: '奈良県' },
    { id: 30, name: '和歌山県' },
    { id: 31, name: '鳥取県' },
    { id: 32, name: '島根県' },
    { id: 33, name: '岡山県' },
    { id: 34, name: '広島県' },
    { id: 35, name: '山口県' },
    { id: 36, name: '徳島県' },
    { id: 37, name: '香川県' },
    { id: 38, name: '愛媛県' },
    { id: 39, name: '高知県' },
    { id: 40, name: '福岡県' },
    { id: 41, name: '佐賀県' },
    { id: 42, name: '長崎県' },
    { id: 43, name: '熊本県' },
    { id: 44, name: '大分県' },
    { id: 45, name: '宮崎県' },
    { id: 46, name: '鹿児島県' },
    { id: 47, name: '沖縄県' }
  ];

  // 都道府県ごとの主要エリア（百貨店のある商業地域を考慮）
  const areasByPrefecture = {
    // 北海道・東北
    '北海道': ['札幌市', '函館市', '旭川市', 'その他'],
    '青森県': ['青森市', '弘前市', '八戸市', 'その他'],
    '岩手県': ['盛岡市', 'その他'],
    '宮城県': ['仙台市（中心部）', '仙台市（その他）', 'その他'],
    '秋田県': ['秋田市', 'その他'],
    '山形県': ['山形市', 'その他'],
    '福島県': ['福島市', '郡山市', 'いわき市', 'その他'],
    
    // 関東（詳細に）
    '茨城県': ['水戸市', '日立市', '土浦市', 'つくば市', 'その他'],
    '栃木県': ['宇都宮市', '足利市', '小山市', 'その他'],
    '群馬県': ['前橋市', '高崎市', '太田市', 'その他'],
    '埼玉県': ['さいたま市（大宮）', 'さいたま市（浦和）', '川越市', '熊谷市', '川口市', '所沢市', '越谷市', '春日部市', 'その他'],
    '千葉県': ['千葉市', '船橋市', '柏市', '市川市', '松戸市', '浦安市', '成田市', 'その他'],
    '東京都': [
      '千代田区（丸の内・大手町）', '千代田区（その他）',
      '中央区（銀座）', '中央区（日本橋）', '中央区（その他）',
      '港区（赤坂・六本木）', '港区（新橋・浜松町）', '港区（その他）',
      '新宿区（新宿駅周辺）', '新宿区（その他）',
      '渋谷区（渋谷駅周辺）', '渋谷区（表参道・原宿）', '渋谷区（その他）',
      '豊島区（池袋）', '豊島区（その他）',
      '文京区', '台東区（上野・浅草）', '墨田区', '江東区', '品川区', '目黒区',
      '大田区', '世田谷区', '中野区', '杉並区', '北区', '荒川区',
      '板橋区', '練馬区', '足立区', '葛飾区', '江戸川区',
      '立川市', '八王子市', '町田市', '多摩地区', 'その他'
    ],
    '神奈川県': ['横浜市（横浜駅周辺）', '横浜市（その他）', '川崎市', '相模原市', '横須賀市', '藤沢市', '鎌倉市', '厚木市', 'その他'],
    
    // 甲信越・北陸
    '新潟県': ['新潟市', '長岡市', 'その他'],
    '富山県': ['富山市', 'その他'],
    '石川県': ['金沢市', 'その他'],
    '福井県': ['福井市', 'その他'],
    '山梨県': ['甲府市', 'その他'],
    '長野県': ['長野市', '松本市', 'その他'],
    
    // 東海
    '岐阜県': ['岐阜市', '大垣市', 'その他'],
    '静岡県': ['静岡市', '浜松市', '沼津市', 'その他'],
    '愛知県': [
      '名古屋市（栄）', '名古屋市（名駅）', '名古屋市（その他）',
      '豊橋市', '岡崎市', '一宮市', '豊田市', 'その他'
    ],
    '三重県': ['津市', '四日市市', 'その他'],
    
    // 関西（詳細に）
    '滋賀県': ['大津市', '草津市', 'その他'],
    '京都府': ['京都市（四条河原町・烏丸）', '京都市（京都駅周辺）', '京都市（その他）', '宇治市', 'その他'],
    '大阪府': [
      '大阪市（梅田・大阪駅周辺）', '大阪市（心斎橋・難波）', '大阪市（その他）',
      '堺市', '豊中市', '吹田市', '高槻市', '枚方市', '茨木市', '東大阪市', 'その他'
    ],
    '兵庫県': [
      '神戸市（三宮・元町）', '神戸市（その他）',
      '西宮市（西宮北口・甲子園）', '西宮市（その他）',
      '姫路市', '尼崎市', '明石市', '芦屋市', '宝塚市', 'その他'
    ],
    '奈良県': ['奈良市', 'その他'],
    '和歌山県': ['和歌山市', 'その他'],
    
    // 中国地方
    '鳥取県': ['鳥取市', 'その他'],
    '島根県': ['松江市', 'その他'],
    '岡山県': ['岡山市', '倉敷市', 'その他'],
    '広島県': ['広島市（紙屋町・八丁堀）', '広島市（その他）', '福山市', 'その他'],
    '山口県': ['下関市', '山口市', 'その他'],
    
    // 四国
    '徳島県': ['徳島市', 'その他'],
    '香川県': ['高松市', 'その他'],
    '愛媛県': ['松山市', 'その他'],
    '高知県': ['高知市', 'その他'],
    
    // 九州・沖縄
    '福岡県': ['福岡市（天神）', '福岡市（博多駅周辺）', '福岡市（その他）', '北九州市', '久留米市', 'その他'],
    '佐賀県': ['佐賀市', 'その他'],
    '長崎県': ['長崎市', '佐世保市', 'その他'],
    '熊本県': ['熊本市', 'その他'],
    '大分県': ['大分市', '別府市', 'その他'],
    '宮崎県': ['宮崎市', 'その他'],
    '鹿児島県': ['鹿児島市', 'その他'],
    '沖縄県': ['那覇市', 'その他']
  };

  // 状態の管理
  const [selectedPrefecture, setSelectedPrefecture] = useState('');
  const [areas, setAreas] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // 都道府県選択時のハンドラー
  const handlePrefectureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const prefecture = e.target.value;
    setSelectedPrefecture(prefecture);
    
    if (prefecture) {
      setAreas(areasByPrefecture[prefecture] || []);
    } else {
      setAreas([]);
    }
    
    setSelectedAreas([]);
  };

  // エリア選択時のハンドラー
  const handleAreaChange = (area) => {
    setSelectedAreas(prev => {
      if (prev.includes(area)) {
        return prev.filter(a => a !== area);
      } else {
        return [...prev, area];
      }
    });
  };

  // 全てのエリアを選択/解除するハンドラー
  const handleSelectAllAreas = (select) => {
    if (select) {
      setSelectedAreas([...areas]);
    } else {
      setSelectedAreas([]);
    }
  };

  // サンプルの求人データ（美容業界特化）
  const sampleJobs = [
    {
      id: 1,
      title: "化粧品カウンター美容部員",
      company: "株式会社パリス化粧品",
      location: "東京都 新宿区（新宿駅周辺）／伊勢丹新宿店",
      salary: "月給 230,000円〜280,000円",
      workType: "正社員",
      postedDate: "2025-02-25",
      tags: ["美容部員", "メイクアップ", "スキンケア", "百貨店"],
      description: "伊勢丹新宿店のカウンターにて、お客様へのスキンケアアドバイスやメイクアップ、商品説明を担当していただきます。美容部員経験者優遇。",
      isNew: true
    },
    {
      id: 2,
      title: "コスメブランドビューティアドバイザー",
      company: "ラグジュアリーコスメティック株式会社",
      location: "東京都 中央区（銀座）／三越銀座店",
      salary: "時給 1,500円〜",
      workType: "派遣",
      postedDate: "2025-02-20",
      tags: ["ビューティアドバイザー", "コスメ", "接客", "百貨店"],
      description: "三越銀座店の化粧品売場にて、フランス発高級コスメブランドのビューティアドバイザーを募集します。お客様のお肌状態を確認し、最適な商品提案をお願いします。",
      isNew: true
    },
    {
      id: 3,
      title: "アロマセラピスト／店舗スタッフ",
      company: "ナチュラルビューティ株式会社",
      location: "東京都 渋谷区（表参道・原宿）／路面店",
      salary: "業務委託：完全歩合制（売上の40%）",
      workType: "業務委託",
      postedDate: "2025-02-18",
      tags: ["アロマセラピスト", "ナチュラルコスメ", "カウンセリング", "路面店"],
      description: "表参道の路面店にて、オーガニックコスメとアロマセラピーのカウンセリングを提供するスタッフを募集します。施術や商品販売を含め、トータルなビューティケアを提供できる方を歓迎します。",
      isNew: false
    },
    {
      id: 4,
      title: "メイクアップアーティスト／美容部員",
      company: "グローバルビューティブランズ株式会社",
      location: "東京都 渋谷区（渋谷駅周辺）／東急百貨店",
      salary: "時給 1,400円〜",
      workType: "アルバイト・パート",
      postedDate: "2025-02-15",
      tags: ["メイクアップ", "美容部員", "接客", "百貨店"],
      description: "東急百貨店渋谷店の化粧品売場にて、メイクアップアーティストを募集します。最新トレンドを取り入れたメイク提案やイベント時のメイクアップデモンストレーションをお願いします。",
      isNew: false
    },
    {
      id: 5,
      title: "エステティシャン／化粧品販売",
      company: "エレガンスビューティ株式会社",
      location: "東京都 千代田区（丸の内・大手町）／丸の内ビル商業施設",
      salary: "月給 250,000円〜320,000円",
      workType: "正社員",
      postedDate: "2025-03-01",
      tags: ["エステティシャン", "フェイシャル", "カウンセリング", "商業施設"],
      description: "丸の内ビル内の高級エステサロンにて、フェイシャルケアを中心としたエステティシャンを募集します。施術だけでなく、お客様へのスキンケア商品の提案・販売も担当していただきます。",
      isNew: true
    },
    {
      id: 6,
      title: "オーガニックコスメアドバイザー",
      company: "ピュアナチュラル株式会社",
      location: "東京都 豊島区（池袋）／ルミネ池袋",
      salary: "業務委託：完全歩合制（売上の35%）+ インセンティブ",
      workType: "業務委託",
      postedDate: "2025-02-10",
      tags: ["オーガニックコスメ", "ナチュラルメイク", "販売", "ルミネ"],
      description: "ルミネ池袋店内のオーガニックコスメショップにて、商品説明や肌質に合わせたアドバイスを行うスタッフを募集します。オーガニック・ナチュラル志向の方、美容や健康に関心のある方歓迎。",
      isNew: false
    },
    {
      id: 7,
      title: "化粧品ブランドマネージャー",
      company: "ジャパンビューティグループ",
      location: "東京都 港区（赤坂・六本木）／本社勤務",
      salary: "年収 450万円〜650万円",
      workType: "正社員",
      postedDate: "2025-02-28",
      tags: ["ブランドマネージャー", "マーケティング", "美容業界", "本社"],
      description: "化粧品ブランドのマーケティング戦略立案から実行までを担当するブランドマネージャーを募集します。百貨店や専門店での販促活動の企画・運営、美容部員の育成指導も行っていただきます。",
      isNew: true
    },
    {
      id: 8,
      title: "百貨店美容部員／スキンケアアドバイザー",
      company: "モイストラボラトリーズ株式会社",
      location: "東京都 世田谷区／玉川高島屋",
      salary: "時給 1,450円〜",
      workType: "派遣",
      postedDate: "2025-02-22",
      tags: ["美容部員", "スキンケア", "カウンセリング", "百貨店"],
      description: "玉川高島屋のスキンケアブランドカウンターにて、お客様の肌状態に合わせたスキンケア商品の提案・販売を行う美容部員を募集します。肌分析機器を使用した肌診断も担当していただきます。",
      isNew: false
    },
    {
      id: 9,
      title: "ヘアメイク兼コスメアドバイザー",
      company: "トレンドビューティ株式会社",
      location: "東京都 渋谷区／SHIBUYA109",
      salary: "時給 1,350円〜",
      workType: "アルバイト・パート",
      postedDate: "2025-02-27",
      tags: ["ヘアメイク", "若年層向け", "トレンド", "ファッションビル"],
      description: "SHIBUYA109内のコスメ専門店にて、若い女性向けのトレンドメイク提案やヘアアレンジを担当するスタッフを募集します。InstagramやTikTokなどSNSへの投稿も担当できる方歓迎。",
      isNew: true
    },
    {
      id: 10,
      title: "韓国コスメ販売スタッフ",
      company: "K-ビューティジャパン株式会社",
      location: "東京都 新宿区／ルミネエスト新宿",
      salary: "時給 1,300円〜1,500円",
      workType: "アルバイト・パート",
      postedDate: "2025-02-16",
      tags: ["韓国コスメ", "トレンドメイク", "接客", "商業施設"],
      description: "ルミネエスト新宿店内の韓国コスメ専門店にて、K-ビューティトレンドを取り入れた商品提案・販売を行うスタッフを募集します。韓国コスメが好きな方、トレンドに敏感な方歓迎。",
      isNew: false
    }
  ];

  // 検索結果のフィルタリング
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchExecuted, setSearchExecuted] = useState(false);

  // 選択されたエリアのタグ表示
  const renderSelectedAreaTags = () => {
    if (selectedAreas.length === 0) return null;
    
    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {selectedAreas.map(area => (
          <div 
            key={area} 
            className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center transition-colors hover:bg-indigo-100"
          >
            {area}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleAreaChange(area);
              }}
              className="ml-1 text-indigo-500 hover:text-indigo-700 focus:outline-none"
              aria-label={`${area}を削除`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    );
  };

  // 検索実行ハンドラー
  const handleSearch = () => {
    console.log('選択された都道府県:', selectedPrefecture);
    console.log('選択されたエリア:', selectedAreas);
    
    // 実際のアプリケーションでは、すべての都道府県で検索できるようにする
    // サンプルのため、現在は東京都のみ結果を表示
    if (selectedPrefecture === '東京都') {
      const filtered = sampleJobs.filter(job => {
        // 選択されたエリアに該当する求人を表示
        for (const area of selectedAreas) {
          // 勤務地の情報に選択されたエリアが含まれているかチェック
          if (job.location.includes(area)) {
            return true;
          }
        }
        return false;
      });
      setFilteredJobs(filtered);
    } else {
      // 東京都以外は空の結果を表示（サンプルのため）
      setFilteredJobs([]);
    }
    
    setSearchExecuted(true);
  };

  // ドロップダウンの開閉
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  // 外部クリックでドロップダウンを閉じるためのイベントリスナー
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // イベントリスナーを追加
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // クリーンアップ関数
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 地域グループ定義
  const regionGroups = [
    { name: '北海道・東北', prefectures: ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'] },
    { name: '関東', prefectures: ['茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県'] },
    { name: '甲信越・北陸', prefectures: ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県'] },
    { name: '東海', prefectures: ['岐阜県', '静岡県', '愛知県', '三重県'] },
    { name: '関西', prefectures: ['滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県'] },
    { name: '中国', prefectures: ['鳥取県', '島根県', '岡山県', '広島県', '山口県'] },
    { name: '四国', prefectures: ['徳島県', '香川県', '愛媛県', '高知県'] },
    { name: '九州・沖縄', prefectures: ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'] }
  ];

  // 選択した都道府県の地域グループを検索
  const findRegionGroup = (prefecture) => {
    for (const group of regionGroups) {
      if (group.prefectures.includes(prefecture)) {
        return group.name;
      }
    }
    return null;
  };

  // 地域と都道府県をグループ化して表示するためのレンダリング関数
  const renderPrefectureOptions = () => {
    return regionGroups.map(group => (
      <optgroup key={group.name} label={group.name}>
        {prefectures
          .filter(prefecture => group.prefectures.includes(prefecture.name))
          .map(prefecture => (
            <option key={prefecture.id} value={prefecture.name}>
              {prefecture.name}
            </option>
          ))}
      </optgroup>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 検索フィルター部分 */}
      <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-100 mb-6">
        <h2 className="text-xl font-bold mb-6 text-gray-800 pb-2 border-b border-gray-200">勤務地で検索</h2>
        
        {/* 都道府県選択 */}
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-700">都道府県</label>
          <div className="relative">
            <select 
              value={selectedPrefecture}
              onChange={handlePrefectureChange}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            >
              <option value="">選択してください</option>
              {renderPrefectureOptions()}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {selectedPrefecture && (
            <div className="mt-1 text-sm text-gray-500">
              {findRegionGroup(selectedPrefecture)}地方
            </div>
          )}
        </div>
        
        {/* エリア選択 */}
        {selectedPrefecture && (
          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium text-gray-700">エリア</label>
              <div className="flex space-x-3">
                <button 
                  onClick={() => handleSelectAllAreas(true)}
                  className={`text-sm px-2 py-1 rounded ${areas.length === 0 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-indigo-600 hover:bg-indigo-50'}`}
                  disabled={areas.length === 0}
                >
                  すべて選択
                </button>
                <button 
                  onClick={() => handleSelectAllAreas(false)}
                  className={`text-sm px-2 py-1 rounded ${selectedAreas.length === 0 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-indigo-600 hover:bg-indigo-50'}`}
                  disabled={selectedAreas.length === 0}
                >
                  すべて解除
                </button>
              </div>
            </div>
            
            <div className="relative mb-2" ref={dropdownRef}>
              <div 
                className={`w-full p-3 border ${isOpen ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-300'} 
                  rounded-lg flex items-center justify-between cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors`}
                onClick={toggleDropdown}
              >
                <div className="truncate text-gray-700">
                  {selectedAreas.length > 0 
                    ? `${selectedAreas.length}エリア選択中` 
                    : 'エリアを選択してください'}
                </div>
                <svg 
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {isOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                  {areas.length > 0 ? (
                    <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {areas.map(area => (
                        <div key={area} className="flex items-center">
                          <div className="relative flex items-center">
                            <input
                              type="checkbox"
                              id={`area-${area}`}
                              checked={selectedAreas.includes(area)}
                              onChange={() => handleAreaChange(area)}
                              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                            />
                            <label htmlFor={`area-${area}`} className="ml-2 text-sm text-gray-700 cursor-pointer select-none">
                              {area}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      エリアがありません
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* 選択されたエリアのタグ表示 */}
            {renderSelectedAreaTags()}
          </div>
        )}
        
        {/* 検索ボタン */}
        <div className="mt-6">
          <button 
            onClick={handleSearch}
            className={`w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 
              text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center
              ${(!selectedPrefecture || (selectedPrefecture && selectedAreas.length === 0)) ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={!selectedPrefecture || (selectedPrefecture && selectedAreas.length === 0)}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            この条件で検索する
          </button>
        </div>
        
        {/* 選択状態の表示 */}
        {selectedPrefecture && selectedAreas.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-medium">{selectedPrefecture}</span>の
              <span className="font-medium">{selectedAreas.length}エリア</span>で検索します
            </p>
          </div>
        )}
      </div>
      
      {/* 検索結果一覧 */}
      {searchExecuted && (
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">検索結果 {filteredJobs.length}件</h2>
          </div>
          
          {filteredJobs.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredJobs.map(job => (
                <div key={job.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-indigo-700">{job.title}</h3>
                    <div className="flex items-center">
                      {job.isNew && (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full mr-2">
                          NEW
                        </span>
                      )}
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded">
                        {job.workType}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="text-gray-700 font-medium">{job.company}</div>
                    <div className="text-gray-600 text-sm flex items-center mt-1">
                      <svg className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </div>
                    <div className="text-gray-600 text-sm flex items-center mt-1">
                      <svg className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {job.salary}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {job.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-xs text-gray-500">掲載日: {job.postedDate}</div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-1.5 px-4 rounded">
                      詳細を見る
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : searchExecuted ? (
            <div className="p-10 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">条件に一致する求人が見つかりませんでした</h3>
              <p className="mt-1 text-gray-500">検索条件を変更して再度お試しください。</p>
              <p className="mt-4 text-sm text-gray-500">
                ※サンプルのため、現在は「東京都」の選択時のみ結果が表示されます
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default LocationFilter;
