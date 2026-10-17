// 由 scripts/build_curriculum.py 產生；請修改來源後重建。
export default {
  "schemaVersion": 1,
  "curriculumVersion": "2026.10.1",
  "id": "Eng-TOEIC",
  "name": "英語行者",
  "target": "TOEIC L&R 900+",
  "branches": [
    {
      "id": "foundation",
      "name": "符文基礎",
      "english": "FOUNDATIONS",
      "color": "#c7a56b",
      "description": "從第一個字母，喚醒你的語言天賦。",
      "lanes": [
        "字母與拼讀",
        "音標與發音",
        "最初的詞語",
        "句子啟程"
      ]
    },
    {
      "id": "grammar",
      "name": "語法鍛造",
      "english": "GRAMMAR",
      "color": "#8aafbd",
      "description": "把零散的詞語，鍛造成清楚的句子。",
      "lanes": [
        "詞性與結構",
        "時態與語氣",
        "子句與假設",
        "進階語法"
      ]
    },
    {
      "id": "vocabulary",
      "name": "詞彙秘庫",
      "english": "LEXICON",
      "color": "#a6b88a",
      "description": "收集詞語，也學會它們並肩出現的方式。",
      "lanes": [
        "生活與旅途",
        "職場與組織",
        "商業與產業",
        "記憶與語塊"
      ]
    },
    {
      "id": "listening",
      "name": "聆聽迴廊",
      "english": "LISTENING",
      "color": "#b29bc7",
      "description": "循著聲音，辨認訊息背後的線索。",
      "lanes": [
        "聲音解碼",
        "照片與問答",
        "對話探索",
        "獨白探索"
      ]
    },
    {
      "id": "reading",
      "name": "閱讀高塔",
      "english": "READING",
      "color": "#cb967f",
      "description": "穿越文字迷霧，找出有根據的答案。",
      "lanes": [
        "句子與填空",
        "單篇文書",
        "閱讀策略",
        "多篇與速度"
      ]
    },
    {
      "id": "expedition",
      "name": "900 遠征",
      "english": "THE EXPEDITION",
      "color": "#cfb268",
      "description": "把練習化為證據，穩穩走向你的目標。",
      "lanes": [
        "診斷與補強",
        "聽力精修",
        "閱讀精修",
        "完整遠征"
      ]
    }
  ],
  "skills": [
    {
      "id": "f01",
      "branch": "foundation",
      "lane": 0,
      "level": 0,
      "title": "初始字母之印",
      "topic": "26 個大寫字母",
      "hours": 8,
      "description": "辨認 A–Z、逐字母唸名稱，練習筆順與抄寫。",
      "checkpoint": "不看範本寫出並唸出 26 個大寫字母。",
      "prerequisites": [],
      "icon": "assets/icons/f01.svg"
    },
    {
      "id": "f02",
      "branch": "foundation",
      "lane": 0,
      "level": 1,
      "title": "雙生字母契約",
      "topic": "26 個小寫字母",
      "hours": 8,
      "description": "練習 a–z 寫法、大小寫配對，分辨 b/d、p/q。",
      "checkpoint": "將 26 組大小寫正確配對並聽寫。",
      "prerequisites": [
        "f01"
      ],
      "icon": "assets/icons/f02.svg"
    },
    {
      "id": "f03",
      "branch": "foundation",
      "lane": 0,
      "level": 2,
      "title": "短母音火種",
      "topic": "短母音與 CVC 拼讀",
      "hours": 12,
      "description": "練習 a/e/i/o/u 短母音，拼讀 cat、bed、sit、hot、cup。",
      "checkpoint": "看見未練過的 CVC 字能嘗試拆音拼讀。",
      "prerequisites": [
        "f02"
      ],
      "icon": "assets/icons/f03.svg"
    },
    {
      "id": "f04",
      "branch": "foundation",
      "lane": 0,
      "level": 3,
      "title": "長母音秘鑰",
      "topic": "長母音與 magic e",
      "hours": 12,
      "description": "比較 cap/cape、kit/kite，練習 a_e、i_e、o_e、u_e。",
      "checkpoint": "辨認短母音與長母音並讀出 20 組對照字。",
      "prerequisites": [
        "f03"
      ],
      "icon": "assets/icons/f04.svg"
    },
    {
      "id": "f05",
      "branch": "foundation",
      "lane": 0,
      "level": 4,
      "title": "雙符熔爐",
      "topic": "子音組合與母音組合",
      "hours": 16,
      "description": "練習 sh/ch/th/ph、bl/st、ee/ea/ai/oa，記錄例外拼法。",
      "checkpoint": "能拆讀常見組合並標記不規則字。",
      "prerequisites": [
        "f04"
      ],
      "icon": "assets/icons/f05.svg"
    },
    {
      "id": "f06",
      "branch": "foundation",
      "lane": 0,
      "level": 5,
      "title": "音節旅者",
      "topic": "音節與拼字規律",
      "hours": 12,
      "description": "分拍多音節字、辨認開閉音節及常見字尾。",
      "checkpoint": "將 20 個熟悉單字分成音節並讀出。",
      "prerequisites": [
        "f05"
      ],
      "icon": "assets/icons/f06.svg"
    },
    {
      "id": "f07",
      "branch": "foundation",
      "lane": 1,
      "level": 0,
      "title": "聆音石碑",
      "topic": "KK 音標入門",
      "hours": 10,
      "description": "了解音標和字母不同，認識字典發音欄與 KK/IPA 標記差異。",
      "checkpoint": "能在字典找到音標與音檔，不把音標當拼字。",
      "prerequisites": [],
      "icon": "assets/icons/f07.svg"
    },
    {
      "id": "f08",
      "branch": "foundation",
      "lane": 1,
      "level": 1,
      "title": "母音水晶",
      "topic": "KK 單母音",
      "hours": 16,
      "description": "對照 /i/、/ɪ/、/ɛ/、/æ/、/ʌ/、/ɑ/、/ɔ/、/ʊ/、/u/、/ə/ 的口形。",
      "checkpoint": "用錄音比較常見母音最小對立詞。",
      "prerequisites": [
        "f07"
      ],
      "icon": "assets/icons/f08.svg"
    },
    {
      "id": "f09",
      "branch": "foundation",
      "lane": 1,
      "level": 2,
      "title": "流光雙星",
      "topic": "KK 雙母音與捲舌母音",
      "hours": 12,
      "description": "練習 /e/、/o/、/aɪ/、/aʊ/、/ɔɪ/ 及帶 r 母音，理解不同字典記號。",
      "checkpoint": "能依音檔區分單母音、雙母音和帶 r 母音。",
      "prerequisites": [
        "f08"
      ],
      "icon": "assets/icons/f09.svg"
    },
    {
      "id": "f10",
      "branch": "foundation",
      "lane": 1,
      "level": 3,
      "title": "子音守衛",
      "topic": "清濁子音與口形",
      "hours": 16,
      "description": "練習 /θ/、/ð/、/ʃ/、/ʒ/、/tʃ/、/dʒ/、/r/、/l/，比較清濁音。",
      "checkpoint": "錄製並區分 thin/then、rice/lice 等對照字。",
      "prerequisites": [
        "f09"
      ],
      "icon": "assets/icons/f10.svg"
    },
    {
      "id": "f11",
      "branch": "foundation",
      "lane": 1,
      "level": 4,
      "title": "尾音封印",
      "topic": "字尾音與複數發音",
      "hours": 12,
      "description": "練習 -s 的 /s/、/z/、/ɪz/ 與 -ed 的 /t/、/d/、/ɪd/。",
      "checkpoint": "能在慢速朗讀中保留字尾且不多加母音。",
      "prerequisites": [
        "f10"
      ],
      "icon": "assets/icons/f11.svg"
    },
    {
      "id": "f12",
      "branch": "foundation",
      "lane": 1,
      "level": 5,
      "title": "重音脈動",
      "topic": "單字重音與弱讀",
      "hours": 14,
      "description": "標記多音節重音、辨認 schwa、比較名詞動詞重音。",
      "checkpoint": "查字典標出重音，跟讀 20 個常見職場字。",
      "prerequisites": [
        "f11"
      ],
      "icon": "assets/icons/f12.svg"
    },
    {
      "id": "f13",
      "branch": "foundation",
      "lane": 2,
      "level": 2,
      "title": "命名者之書",
      "topic": "人與物的基本單字",
      "hours": 12,
      "description": "認識人、家人、教室及居家物品，用圖卡配對聲音與拼字。",
      "checkpoint": "看圖說出並辨認 60 個高頻名詞。",
      "prerequisites": [
        "f02"
      ],
      "icon": "assets/icons/f13.svg"
    },
    {
      "id": "f14",
      "branch": "foundation",
      "lane": 2,
      "level": 3,
      "title": "數字星盤",
      "topic": "數字與數量",
      "hours": 10,
      "description": "練習 0–100、百千、序數與電話號碼，分辨 thirteen/thirty。",
      "checkpoint": "能聽寫常見數字、順位及電話號碼。",
      "prerequisites": [
        "f13"
      ],
      "icon": "assets/icons/f14.svg"
    },
    {
      "id": "f15",
      "branch": "foundation",
      "lane": 2,
      "level": 4,
      "title": "時光沙漏",
      "topic": "日期與時間",
      "hours": 12,
      "description": "練習星期、月份、日期、整點、半點與 a.m./p.m.。",
      "checkpoint": "能讀懂並說出行事曆上的日期和時間。",
      "prerequisites": [
        "f14"
      ],
      "icon": "assets/icons/f15.svg"
    },
    {
      "id": "f16",
      "branch": "foundation",
      "lane": 2,
      "level": 5,
      "title": "方位羅盤",
      "topic": "位置與方向",
      "hours": 10,
      "description": "學上下、左右、前後與東西南北，搭配簡單地圖。",
      "checkpoint": "依簡單指示在地圖找出目的地。",
      "prerequisites": [
        "f15"
      ],
      "icon": "assets/icons/f16.svg"
    },
    {
      "id": "f17",
      "branch": "foundation",
      "lane": 2,
      "level": 6,
      "title": "行動火花",
      "topic": "常見動作詞",
      "hours": 12,
      "description": "以圖片和短句練習 eat、go、work、buy、read 等動作。",
      "checkpoint": "看動作圖選出對應動詞並組成簡短句子。",
      "prerequisites": [
        "f16"
      ],
      "icon": "assets/icons/f17.svg"
    },
    {
      "id": "f18",
      "branch": "foundation",
      "lane": 2,
      "level": 7,
      "title": "日常補給袋",
      "topic": "顏色、食物與生活詞",
      "hours": 14,
      "description": "整理顏色、衣服、食物、交通及天氣詞，練習分類與複習。",
      "checkpoint": "能辨認 100 個常用生活詞並用短語描述圖片。",
      "prerequisites": [
        "f17"
      ],
      "icon": "assets/icons/f18.svg"
    },
    {
      "id": "f19",
      "branch": "foundation",
      "lane": 3,
      "level": 2,
      "title": "句子骨架",
      "topic": "主詞、動詞與語序",
      "hours": 12,
      "description": "認識英文主詞在動詞前的基本順序，分辨句子和片段。",
      "checkpoint": "能指出 20 個簡單句的主詞及動詞。",
      "prerequisites": [
        "f02"
      ],
      "icon": "assets/icons/f19.svg"
    },
    {
      "id": "f20",
      "branch": "foundation",
      "lane": 3,
      "level": 3,
      "title": "存在之盾",
      "topic": "be 動詞基礎",
      "hours": 12,
      "description": "練習 I am、you are、he is，描述身分、狀態與位置。",
      "checkpoint": "寫出肯定、否定和疑問各 5 句。",
      "prerequisites": [
        "f19"
      ],
      "icon": "assets/icons/f20.svg"
    },
    {
      "id": "f21",
      "branch": "foundation",
      "lane": 3,
      "level": 4,
      "title": "代名面具",
      "topic": "人稱與所有格入門",
      "hours": 10,
      "description": "學 I/me/my、you/your、he/him/his、she/her 及 it/they。",
      "checkpoint": "依人物情境選對主格、受格與所有格。",
      "prerequisites": [
        "f20"
      ],
      "icon": "assets/icons/f21.svg"
    },
    {
      "id": "f22",
      "branch": "foundation",
      "lane": 3,
      "level": 5,
      "title": "提問之匙",
      "topic": "疑問詞入門",
      "hours": 12,
      "description": "用 who、what、where、when、why、how 提出日常問題。",
      "checkpoint": "將六種疑問詞和適合的回答配對。",
      "prerequisites": [
        "f21"
      ],
      "icon": "assets/icons/f22.svg"
    },
    {
      "id": "f23",
      "branch": "foundation",
      "lane": 3,
      "level": 6,
      "title": "否定結界",
      "topic": "do 問句與否定句",
      "hours": 14,
      "description": "練習 do/does、don't/doesn't，區分 be 問句和一般動詞問句。",
      "checkpoint": "將 20 個簡單肯定句改成問句或否定句。",
      "prerequisites": [
        "f22"
      ],
      "icon": "assets/icons/f23.svg"
    },
    {
      "id": "f24",
      "branch": "foundation",
      "lane": 3,
      "level": 7,
      "title": "旅者初試",
      "topic": "基礎短句整合",
      "hours": 14,
      "description": "閱讀 3–5 句生活小段落，朗讀並改寫人物、時間與地點。",
      "checkpoint": "能讀懂短自我介紹並寫出自己的 5 句介紹。",
      "prerequisites": [
        "f23"
      ],
      "icon": "assets/icons/f24.svg"
    },
    {
      "id": "g01",
      "branch": "grammar",
      "lane": 0,
      "level": 0,
      "title": "八職者議會",
      "topic": "八大詞性",
      "hours": 12,
      "description": "分辨名詞、代名詞、動詞、形容詞、副詞、介系詞、連接詞與感嘆詞。",
      "checkpoint": "能標記短句中各字的詞性。",
      "prerequisites": [
        "f20"
      ],
      "icon": "assets/icons/g01.svg"
    },
    {
      "id": "g02",
      "branch": "grammar",
      "lane": 0,
      "level": 1,
      "title": "名詞寶庫",
      "topic": "可數與不可數名詞",
      "hours": 12,
      "description": "練習單複數、不可數名詞與量詞 a piece of/a bottle of。",
      "checkpoint": "正確使用 20 組名詞與量詞。",
      "prerequisites": [
        "g01"
      ],
      "icon": "assets/icons/g02.svg"
    },
    {
      "id": "g03",
      "branch": "grammar",
      "lane": 0,
      "level": 2,
      "title": "冠冕法則",
      "topic": "冠詞與限定詞",
      "hours": 14,
      "description": "比較 a/an/the、零冠詞、this/that、some/any。",
      "checkpoint": "能說明日常短文中冠詞與限定詞的選擇。",
      "prerequisites": [
        "g02"
      ],
      "icon": "assets/icons/g03.svg"
    },
    {
      "id": "g04",
      "branch": "grammar",
      "lane": 0,
      "level": 3,
      "title": "代名幻術",
      "topic": "代名詞進階",
      "hours": 12,
      "description": "練習反身、所有、指示與不定代名詞，辨認代名詞指涉。",
      "checkpoint": "在段落中找出代名詞指向的人或物。",
      "prerequisites": [
        "g01",
        "f21"
      ],
      "icon": "assets/icons/g04.svg"
    },
    {
      "id": "g05",
      "branch": "grammar",
      "lane": 0,
      "level": 4,
      "title": "修飾之刃",
      "topic": "形容詞與副詞",
      "hours": 14,
      "description": "比較修飾名詞和動詞的位置，練習 -ly 與常見例外。",
      "checkpoint": "完成詞性選擇並解釋修飾對象。",
      "prerequisites": [
        "g01"
      ],
      "icon": "assets/icons/g05.svg"
    },
    {
      "id": "g06",
      "branch": "grammar",
      "lane": 0,
      "level": 5,
      "title": "比較天秤",
      "topic": "比較級與最高級",
      "hours": 12,
      "description": "學 -er/-est、more/most、as…as 與不規則變化。",
      "checkpoint": "將商品或人物資料寫成比較句。",
      "prerequisites": [
        "g05"
      ],
      "icon": "assets/icons/g06.svg"
    },
    {
      "id": "g07",
      "branch": "grammar",
      "lane": 0,
      "level": 6,
      "title": "介系門扉",
      "topic": "時間介系詞",
      "hours": 12,
      "description": "分辨 at/on/in、for/since、by/until、during/within。",
      "checkpoint": "依行事曆及截止時間選對介系詞。",
      "prerequisites": [
        "g01"
      ],
      "icon": "assets/icons/g07.svg"
    },
    {
      "id": "g08",
      "branch": "grammar",
      "lane": 0,
      "level": 7,
      "title": "空間符陣",
      "topic": "地點與移動介系詞",
      "hours": 12,
      "description": "練習 in/on/at、between/among、into/onto/through/across。",
      "checkpoint": "依地圖或照片完成位置及移動描述。",
      "prerequisites": [
        "g01"
      ],
      "icon": "assets/icons/g08.svg"
    },
    {
      "id": "g09",
      "branch": "grammar",
      "lane": 0,
      "level": 8,
      "title": "五式劍陣",
      "topic": "五大句型",
      "hours": 16,
      "description": "拆解 SV、SVC、SVO、SVOO、SVOC 的動詞與補語。",
      "checkpoint": "將 25 個句子分類並指出必要成分。",
      "prerequisites": [
        "g01",
        "f23"
      ],
      "icon": "assets/icons/g09.svg"
    },
    {
      "id": "g10",
      "branch": "grammar",
      "lane": 0,
      "level": 9,
      "title": "主謂共鳴",
      "topic": "主詞動詞一致",
      "hours": 16,
      "description": "辨認真正主詞、介系詞插入語、each/every、there be 與複合主詞。",
      "checkpoint": "完成混合題並能說明動詞單複數依據。",
      "prerequisites": [
        "g09",
        "g11"
      ],
      "icon": "assets/icons/g10.svg"
    },
    {
      "id": "g11",
      "branch": "grammar",
      "lane": 1,
      "level": 0,
      "title": "當下之刻",
      "topic": "現在簡單式",
      "hours": 12,
      "description": "練習習慣、事實、頻率副詞與第三人稱單數。",
      "checkpoint": "用正確動詞描述日常作息並改成問句。",
      "prerequisites": [
        "f23"
      ],
      "icon": "assets/icons/g11.svg"
    },
    {
      "id": "g12",
      "branch": "grammar",
      "lane": 1,
      "level": 1,
      "title": "流動時輪",
      "topic": "現在進行式",
      "hours": 12,
      "description": "練習 be + V-ing、暫時狀態與不常用進行式的狀態動詞。",
      "checkpoint": "分辨現在習慣和正在進行的動作。",
      "prerequisites": [
        "g11"
      ],
      "icon": "assets/icons/g12.svg"
    },
    {
      "id": "g13",
      "branch": "grammar",
      "lane": 1,
      "level": 2,
      "title": "往昔碑文",
      "topic": "過去簡單式",
      "hours": 16,
      "description": "練習規則及高頻不規則過去式、did 問句和否定。",
      "checkpoint": "用過去式描述昨天的活動並校正動詞。",
      "prerequisites": [
        "g12"
      ],
      "icon": "assets/icons/g13.svg"
    },
    {
      "id": "g14",
      "branch": "grammar",
      "lane": 1,
      "level": 3,
      "title": "交錯年輪",
      "topic": "過去進行式",
      "hours": 12,
      "description": "以 when/while 比較背景動作及突然事件。",
      "checkpoint": "能敘述一段有先後或同時動作的小故事。",
      "prerequisites": [
        "g12",
        "g13"
      ],
      "icon": "assets/icons/g14.svg"
    },
    {
      "id": "g15",
      "branch": "grammar",
      "lane": 1,
      "level": 4,
      "title": "未來預言",
      "topic": "未來表達",
      "hours": 12,
      "description": "比較 will、be going to、現在進行式安排與時間副詞子句。",
      "checkpoint": "依承諾、預測及已安排事項選擇表達。",
      "prerequisites": [
        "g11"
      ],
      "icon": "assets/icons/g15.svg"
    },
    {
      "id": "g16",
      "branch": "grammar",
      "lane": 1,
      "level": 5,
      "title": "成就刻印",
      "topic": "現在完成式",
      "hours": 18,
      "description": "練習 have/has + p.p.、ever/never、already/yet、for/since。",
      "checkpoint": "分辨經驗、延續狀態及已結束的過去事件。",
      "prerequisites": [
        "g13"
      ],
      "icon": "assets/icons/g16.svg"
    },
    {
      "id": "g17",
      "branch": "grammar",
      "lane": 1,
      "level": 6,
      "title": "先後時序",
      "topic": "過去完成式",
      "hours": 14,
      "description": "以 had + p.p. 表達過去的先後，搭配 before/after/by the time。",
      "checkpoint": "依事件時間線正確選用兩種過去時態。",
      "prerequisites": [
        "g16"
      ],
      "icon": "assets/icons/g17.svg"
    },
    {
      "id": "g18",
      "branch": "grammar",
      "lane": 1,
      "level": 7,
      "title": "延續回聲",
      "topic": "完成進行式與未來完成式",
      "hours": 16,
      "description": "比較 have been V-ing、will have p.p.，辨認持續與期限前完成。",
      "checkpoint": "從上下文判讀持續多久及何時以前完成。",
      "prerequisites": [
        "g17"
      ],
      "icon": "assets/icons/g18.svg"
    },
    {
      "id": "g19",
      "branch": "grammar",
      "lane": 1,
      "level": 8,
      "title": "可能之杖",
      "topic": "助動詞與推測",
      "hours": 16,
      "description": "學 can/could、may/might、must/should/have to 與推測強弱。",
      "checkpoint": "區分能力、允許、義務、建議和推測。",
      "prerequisites": [
        "g11"
      ],
      "icon": "assets/icons/g19.svg"
    },
    {
      "id": "g20",
      "branch": "grammar",
      "lane": 1,
      "level": 9,
      "title": "被動護甲",
      "topic": "被動語態",
      "hours": 18,
      "description": "練習各常見時態的 be + p.p.、by 施事者與主被動改寫。",
      "checkpoint": "理解職場公告中由誰做、何事被完成。",
      "prerequisites": [
        "g13",
        "g16"
      ],
      "icon": "assets/icons/g20.svg"
    },
    {
      "id": "g21",
      "branch": "grammar",
      "lane": 2,
      "level": 9,
      "title": "並列雙刃",
      "topic": "對等連接詞",
      "hours": 10,
      "description": "用 and/but/or/so/yet 連接對等成分，學平行結構。",
      "checkpoint": "能辨認連接詞兩側的結構是否對等。",
      "prerequisites": [
        "g09",
        "g13"
      ],
      "icon": "assets/icons/g21.svg"
    },
    {
      "id": "g22",
      "branch": "grammar",
      "lane": 2,
      "level": 10,
      "title": "時序迴廊",
      "topic": "時間副詞子句",
      "hours": 14,
      "description": "學 when/while/before/after/until/as soon as 及未來時間子句。",
      "checkpoint": "能合併兩句並正確表達先後時間。",
      "prerequisites": [
        "g21"
      ],
      "icon": "assets/icons/g22.svg"
    },
    {
      "id": "g23",
      "branch": "grammar",
      "lane": 2,
      "level": 11,
      "title": "因果鎖鏈",
      "topic": "原因與讓步子句",
      "hours": 16,
      "description": "比較 because/since、although/even though、because of/despite。",
      "checkpoint": "能依後接子句或名詞選擇正確連接語。",
      "prerequisites": [
        "g21"
      ],
      "icon": "assets/icons/g23.svg"
    },
    {
      "id": "g24",
      "branch": "grammar",
      "lane": 2,
      "level": 12,
      "title": "條件契印",
      "topic": "零條件與第一類條件句",
      "hours": 14,
      "description": "用 if + 現在式描述規律及可能未來，練習 unless。",
      "checkpoint": "分辨一般規律和真實未來條件並造句。",
      "prerequisites": [
        "g11",
        "g15"
      ],
      "icon": "assets/icons/g24.svg"
    },
    {
      "id": "g25",
      "branch": "grammar",
      "lane": 2,
      "level": 13,
      "title": "幻境分岔",
      "topic": "第二類假設句",
      "hours": 16,
      "description": "練習 if + 過去式、would/could，表達現在非事實情境。",
      "checkpoint": "能將真實情況改寫為合理的假設情境。",
      "prerequisites": [
        "g24",
        "g13"
      ],
      "icon": "assets/icons/g25.svg"
    },
    {
      "id": "g26",
      "branch": "grammar",
      "lane": 2,
      "level": 14,
      "title": "逆時願望",
      "topic": "第三類假設句",
      "hours": 18,
      "description": "練習 if + had p.p.、would have p.p. 表達過去非事實。",
      "checkpoint": "根據過去事實寫出假設與結果。",
      "prerequisites": [
        "g25"
      ],
      "icon": "assets/icons/g26.svg"
    },
    {
      "id": "g27",
      "branch": "grammar",
      "lane": 2,
      "level": 15,
      "title": "交界預言",
      "topic": "混合假設與 wish",
      "hours": 16,
      "description": "比較過去原因現在結果，練習 wish、if only 與常見倒裝條件。",
      "checkpoint": "能判斷假設時間和結果時間是否不同。",
      "prerequisites": [
        "g26"
      ],
      "icon": "assets/icons/g27.svg"
    },
    {
      "id": "g28",
      "branch": "grammar",
      "lane": 2,
      "level": 16,
      "title": "關係織網",
      "topic": "關係代名詞",
      "hours": 18,
      "description": "練習 who/which/that/whose、主格受格及限定關係子句。",
      "checkpoint": "將兩個句子合併，找出關係詞先行詞。",
      "prerequisites": [
        "g09"
      ],
      "icon": "assets/icons/g28.svg"
    },
    {
      "id": "g29",
      "branch": "grammar",
      "lane": 2,
      "level": 17,
      "title": "隱形連結",
      "topic": "關係副詞與省略",
      "hours": 16,
      "description": "學 where/when/why、非限定子句、受格關係詞省略。",
      "checkpoint": "辨認逗號對句意的影響及何時可省略。",
      "prerequisites": [
        "g28"
      ],
      "icon": "assets/icons/g29.svg"
    },
    {
      "id": "g30",
      "branch": "grammar",
      "lane": 2,
      "level": 18,
      "title": "名詞幻境",
      "topic": "名詞子句與間接問句",
      "hours": 18,
      "description": "學 that/whether/if 與 wh- 名詞子句，練習直述語序。",
      "checkpoint": "將直接問句改為禮貌間接問句並保持語序。",
      "prerequisites": [
        "g09",
        "f22"
      ],
      "icon": "assets/icons/g30.svg"
    },
    {
      "id": "g31",
      "branch": "grammar",
      "lane": 3,
      "level": 9,
      "title": "動名雙形",
      "topic": "動名詞與不定詞",
      "hours": 18,
      "description": "整理 enjoy/avoid + V-ing、decide/plan + to V，辨認主詞及受詞用途。",
      "checkpoint": "對常見動詞選對後接形式並理解句意。",
      "prerequisites": [
        "g09",
        "g15"
      ],
      "icon": "assets/icons/g31.svg"
    },
    {
      "id": "g32",
      "branch": "grammar",
      "lane": 3,
      "level": 10,
      "title": "使役契約",
      "topic": "使役與感官動詞",
      "hours": 14,
      "description": "練習 make/let/have/get 及 see/hear 的後接形式。",
      "checkpoint": "能改寫請人做事及感官觀察的句子。",
      "prerequisites": [
        "g09",
        "g31"
      ],
      "icon": "assets/icons/g32.svg"
    },
    {
      "id": "g33",
      "branch": "grammar",
      "lane": 3,
      "level": 11,
      "title": "分詞雙面",
      "topic": "現在分詞與過去分詞",
      "hours": 16,
      "description": "比較 exciting/excited、修飾名詞的主動或被動關係。",
      "checkpoint": "能依被修飾名詞選出正確分詞。",
      "prerequisites": [
        "g05",
        "g20"
      ],
      "icon": "assets/icons/g33.svg"
    },
    {
      "id": "g34",
      "branch": "grammar",
      "lane": 3,
      "level": 12,
      "title": "縮句秘術",
      "topic": "分詞構句",
      "hours": 18,
      "description": "辨認省略主詞的副詞子句、主動與被動分詞及懸垂錯誤。",
      "checkpoint": "將簡單副詞子句與分詞構句互相還原。",
      "prerequisites": [
        "g33",
        "g22"
      ],
      "icon": "assets/icons/g34.svg"
    },
    {
      "id": "g35",
      "branch": "grammar",
      "lane": 3,
      "level": 19,
      "title": "傳話信使",
      "topic": "間接引語",
      "hours": 16,
      "description": "練習時態、人稱、時間詞變化及轉述問句與命令。",
      "checkpoint": "能把短對話改寫為清楚的轉述句。",
      "prerequisites": [
        "g13",
        "g16",
        "g30"
      ],
      "icon": "assets/icons/g35.svg"
    },
    {
      "id": "g36",
      "branch": "grammar",
      "lane": 3,
      "level": 20,
      "title": "倒裝鏡界",
      "topic": "倒裝與強調",
      "hours": 16,
      "description": "辨認否定副詞開頭、only 倒裝、it is…that 強調與 do 強調。",
      "checkpoint": "能還原句子的正常語序並找出強調重點。",
      "prerequisites": [
        "g09"
      ],
      "icon": "assets/icons/g36.svg"
    },
    {
      "id": "g37",
      "branch": "grammar",
      "lane": 3,
      "level": 21,
      "title": "成對誓約",
      "topic": "成對連接與平行結構",
      "hours": 14,
      "description": "練習 both…and、either…or、neither…nor、not only…but also。",
      "checkpoint": "完成句子並檢查詞性、時態與結構對等。",
      "prerequisites": [
        "g21"
      ],
      "icon": "assets/icons/g37.svg"
    },
    {
      "id": "g38",
      "branch": "grammar",
      "lane": 3,
      "level": 22,
      "title": "搭配銘文",
      "topic": "常見文法搭配",
      "hours": 18,
      "description": "整理介系詞搭配、形容詞加介系詞、固定句型及易混用法。",
      "checkpoint": "建立並複習 40 組職場常見搭配例句。",
      "prerequisites": [
        "g01"
      ],
      "icon": "assets/icons/g38.svg"
    },
    {
      "id": "g39",
      "branch": "grammar",
      "lane": 3,
      "level": 23,
      "title": "長句解咒",
      "topic": "長句結構拆解",
      "hours": 18,
      "description": "找主要動詞、括出插入語、拆開關係與名詞子句，避免逐字翻譯。",
      "checkpoint": "能為 10 個長句畫出主幹及修飾關係。",
      "prerequisites": [
        "g09",
        "g28",
        "g30"
      ],
      "icon": "assets/icons/g39.svg"
    },
    {
      "id": "g40",
      "branch": "grammar",
      "lane": 3,
      "level": 24,
      "title": "語法熔鑄試煉",
      "topic": "語法綜合診斷",
      "hours": 20,
      "description": "混合練習詞性、時態、語態、子句與搭配，將錯題按原因分類。",
      "checkpoint": "兩次不同題組達自訂 85% 檢核門檻並能解釋錯因。",
      "prerequisites": [
        "g10",
        "g20",
        "g27",
        "g29",
        "g34",
        "g35",
        "g36",
        "g37",
        "g38",
        "g39"
      ],
      "icon": "assets/icons/g40.svg"
    },
    {
      "id": "v01",
      "branch": "vocabulary",
      "lane": 0,
      "level": 0,
      "title": "旅人行囊",
      "topic": "交通與通勤詞彙",
      "hours": 16,
      "description": "學班次、票價、轉乘、延誤、道路與車站詞，用路線情境複習。",
      "checkpoint": "讀懂車站告示並理解常見交通廣播詞。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v01.svg"
    },
    {
      "id": "v02",
      "branch": "vocabulary",
      "lane": 0,
      "level": 1,
      "title": "雲端港口",
      "topic": "航空與機場詞彙",
      "hours": 16,
      "description": "學登機、報到、行李、航廈、安檢及轉機搭配。",
      "checkpoint": "能以詞組整理一趟搭機流程。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v02.svg"
    },
    {
      "id": "v03",
      "branch": "vocabulary",
      "lane": 0,
      "level": 2,
      "title": "驛站之鑰",
      "topic": "旅館與住宿詞彙",
      "hours": 14,
      "description": "學預訂、空房、設施、入住退房、費用與取消政策。",
      "checkpoint": "讀懂訂房確認信與旅館服務說明。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v03.svg"
    },
    {
      "id": "v04",
      "branch": "vocabulary",
      "lane": 0,
      "level": 3,
      "title": "盛宴補給",
      "topic": "餐飲與購物詞彙",
      "hours": 16,
      "description": "學菜單、點餐、庫存、收據、折扣與退款搭配。",
      "checkpoint": "理解餐廳通知及商店促銷短文。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v04.svg"
    },
    {
      "id": "v05",
      "branch": "vocabulary",
      "lane": 0,
      "level": 4,
      "title": "修繕工坊",
      "topic": "住宅與維修詞彙",
      "hours": 16,
      "description": "學租約、家具、設施故障、修理預約及住戶通知。",
      "checkpoint": "讀懂維修工單與住宅公告。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v05.svg"
    },
    {
      "id": "v06",
      "branch": "vocabulary",
      "lane": 0,
      "level": 5,
      "title": "生命泉水",
      "topic": "健康與醫療生活詞彙",
      "hours": 14,
      "description": "學預約、症狀、診所、保險、藥局與健康活動常見詞。",
      "checkpoint": "理解診所時間、預約提醒及保健公告。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v06.svg"
    },
    {
      "id": "v07",
      "branch": "vocabulary",
      "lane": 0,
      "level": 6,
      "title": "節慶星火",
      "topic": "活動與休閒詞彙",
      "hours": 14,
      "description": "學展覽、演出、報名、場館、入場與休閒活動搭配。",
      "checkpoint": "理解活動行程及售票說明。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v07.svg"
    },
    {
      "id": "v08",
      "branch": "vocabulary",
      "lane": 0,
      "level": 7,
      "title": "自然結界",
      "topic": "天氣與環境詞彙",
      "hours": 14,
      "description": "學天氣、能源、回收、汙染與永續行動詞組。",
      "checkpoint": "理解天候延誤與環保活動通知。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v08.svg"
    },
    {
      "id": "v09",
      "branch": "vocabulary",
      "lane": 1,
      "level": 0,
      "title": "公會招募",
      "topic": "求職與招募詞彙",
      "hours": 18,
      "description": "學職缺、資格、履歷、申請、面試與錄用搭配。",
      "checkpoint": "讀懂徵才廣告並找出資格與截止日期。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v09.svg"
    },
    {
      "id": "v10",
      "branch": "vocabulary",
      "lane": 1,
      "level": 1,
      "title": "職務徽章",
      "topic": "部門與職責詞彙",
      "hours": 16,
      "description": "學部門、職稱、職責、管理與匯報關係。",
      "checkpoint": "理解組織介紹並辨認誰負責哪件事。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v10.svg"
    },
    {
      "id": "v11",
      "branch": "vocabulary",
      "lane": 1,
      "level": 2,
      "title": "議事圓桌",
      "topic": "會議與排程詞彙",
      "hours": 16,
      "description": "學議程、會議紀錄、延期、協調與行事曆搭配。",
      "checkpoint": "讀懂會議邀請、時間更動及議程。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v11.svg"
    },
    {
      "id": "v12",
      "branch": "vocabulary",
      "lane": 1,
      "level": 3,
      "title": "信使卷軸",
      "topic": "郵件與辦公詞彙",
      "hours": 16,
      "description": "學附件、轉寄、文具、設備、表單與辦公室用語。",
      "checkpoint": "理解辦公室電子郵件中的請求與物件。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v12.svg"
    },
    {
      "id": "v13",
      "branch": "vocabulary",
      "lane": 1,
      "level": 4,
      "title": "工匠晉階",
      "topic": "培訓與人事詞彙",
      "hours": 16,
      "description": "學訓練、績效、升遷、福利、休假與人事政策。",
      "checkpoint": "讀懂培訓安排及員工福利公告。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v13.svg"
    },
    {
      "id": "v14",
      "branch": "vocabulary",
      "lane": 1,
      "level": 5,
      "title": "盟約法典",
      "topic": "合約與規章詞彙",
      "hours": 18,
      "description": "學條款、義務、允許、禁止、有效期與遵守規範。",
      "checkpoint": "找出簡單合約或政策的義務與期限。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v14.svg"
    },
    {
      "id": "v15",
      "branch": "vocabulary",
      "lane": 1,
      "level": 6,
      "title": "服務誓言",
      "topic": "客服與抱怨處理詞彙",
      "hours": 16,
      "description": "學查詢、故障、補償、換貨、滿意度與客服回覆。",
      "checkpoint": "理解客訴問題與公司提出的解決方案。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v15.svg"
    },
    {
      "id": "v16",
      "branch": "vocabulary",
      "lane": 1,
      "level": 7,
      "title": "公會變革",
      "topic": "組織異動與專案詞彙",
      "hours": 18,
      "description": "學合併、遷址、進度、里程碑、分工與成果。",
      "checkpoint": "理解組織變動及專案進度通知。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v16.svg"
    },
    {
      "id": "v17",
      "branch": "vocabulary",
      "lane": 2,
      "level": 0,
      "title": "金幣帳冊",
      "topic": "銀行與付款詞彙",
      "hours": 18,
      "description": "學帳戶、匯款、餘額、到期日、分期與付款方式。",
      "checkpoint": "讀懂付款指示並找出金額及期限。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v17.svg"
    },
    {
      "id": "v18",
      "branch": "vocabulary",
      "lane": 2,
      "level": 1,
      "title": "商旅交易",
      "topic": "採購與訂單詞彙",
      "hours": 18,
      "description": "學報價、採購、批量、訂單確認、缺貨與取消。",
      "checkpoint": "理解訂單往來並辨認數量、價格及變動。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v18.svg"
    },
    {
      "id": "v19",
      "branch": "vocabulary",
      "lane": 2,
      "level": 2,
      "title": "運輸商隊",
      "topic": "物流與配送詞彙",
      "hours": 18,
      "description": "學倉儲、出貨、追蹤、運費、報關與簽收搭配。",
      "checkpoint": "理解配送通知及延誤原因。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v19.svg"
    },
    {
      "id": "v20",
      "branch": "vocabulary",
      "lane": 2,
      "level": 3,
      "title": "市集號角",
      "topic": "行銷與廣告詞彙",
      "hours": 18,
      "description": "學活動、目標客群、促銷、宣傳、品牌與市占。",
      "checkpoint": "理解行銷提案及廣告主要賣點。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v20.svg"
    },
    {
      "id": "v21",
      "branch": "vocabulary",
      "lane": 2,
      "level": 4,
      "title": "鍛造產線",
      "topic": "製造與品質詞彙",
      "hours": 16,
      "description": "學產線、原料、檢驗、缺陷、規格與改善搭配。",
      "checkpoint": "理解生產或品管報告中的問題與對策。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v21.svg"
    },
    {
      "id": "v22",
      "branch": "vocabulary",
      "lane": 2,
      "level": 5,
      "title": "水晶終端",
      "topic": "科技與資訊詞彙",
      "hours": 18,
      "description": "學安裝、更新、權限、備份、連線與技術支援。",
      "checkpoint": "讀懂軟體通知與設備操作說明。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v22.svg"
    },
    {
      "id": "v23",
      "branch": "vocabulary",
      "lane": 2,
      "level": 6,
      "title": "財務天秤",
      "topic": "財報與預算詞彙",
      "hours": 18,
      "description": "學收入、成本、利潤、預算、成長與下降搭配。",
      "checkpoint": "理解簡單財務摘要及趨勢描述。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v23.svg"
    },
    {
      "id": "v24",
      "branch": "vocabulary",
      "lane": 2,
      "level": 7,
      "title": "建築領地",
      "topic": "不動產與公共建設詞彙",
      "hours": 16,
      "description": "學建築、租賃、翻修、工程、設施與公共服務。",
      "checkpoint": "讀懂施工公告及商業空間介紹。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v24.svg"
    },
    {
      "id": "v25",
      "branch": "vocabulary",
      "lane": 3,
      "level": 0,
      "title": "字根源石",
      "topic": "常見字根與詞族",
      "hours": 16,
      "description": "用 act、form、port、spect 等建立詞族，記錄例字與意思。",
      "checkpoint": "從已學字根推測熟悉語境中的衍生字。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v25.svg"
    },
    {
      "id": "v26",
      "branch": "vocabulary",
      "lane": 3,
      "level": 1,
      "title": "前綴法印",
      "topic": "常見字首",
      "hours": 14,
      "description": "學 un-/in-/im-/re-/pre-/dis-/mis- 並辨認例外。",
      "checkpoint": "能用字首幫助理解 30 個例字而非只憑字形猜義。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v26.svg"
    },
    {
      "id": "v27",
      "branch": "vocabulary",
      "lane": 3,
      "level": 2,
      "title": "字尾鑄模",
      "topic": "字尾與詞性轉換",
      "hours": 16,
      "description": "學 -tion/-ment/-ity、-ive/-able、-ize/-ify、-ly。",
      "checkpoint": "將常見詞族依名詞、動詞、形容詞、副詞分類。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v27.svg"
    },
    {
      "id": "v28",
      "branch": "vocabulary",
      "lane": 3,
      "level": 3,
      "title": "同義幻影",
      "topic": "同義改寫與近義辨析",
      "hours": 20,
      "description": "比較職場常見同義表達、語境與正式程度，避免逐字替換。",
      "checkpoint": "能配對 40 組題幹與內文常見改寫。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v28.svg"
    },
    {
      "id": "v29",
      "branch": "vocabulary",
      "lane": 3,
      "level": 4,
      "title": "雙刃辨識",
      "topic": "易混字與多義字",
      "hours": 18,
      "description": "比較 affect/effect、rise/raise 等，依詞性和搭配辨認多義字。",
      "checkpoint": "為 30 組易混字寫出可分辨的例句。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v29.svg"
    },
    {
      "id": "v30",
      "branch": "vocabulary",
      "lane": 3,
      "level": 5,
      "title": "語塊連鎖",
      "topic": "高頻搭配與片語動詞",
      "hours": 20,
      "description": "學 make a reservation、meet a deadline、carry out 等語塊。",
      "checkpoint": "依情境使用 50 組高頻職場搭配。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v30.svg"
    },
    {
      "id": "v31",
      "branch": "vocabulary",
      "lane": 3,
      "level": 6,
      "title": "間隔回聲",
      "topic": "間隔複習與主動回想",
      "hours": 18,
      "description": "以小批次卡片建立 1、3、7、14 天複習，交錯聽音與看字回想。",
      "checkpoint": "連續四週記錄遺忘詞並調整複習間隔。",
      "prerequisites": [
        "f18"
      ],
      "icon": "assets/icons/v31.svg"
    },
    {
      "id": "v32",
      "branch": "vocabulary",
      "lane": 3,
      "level": 8,
      "title": "詞彙守庫試煉",
      "topic": "語境詞彙整合",
      "hours": 20,
      "description": "在短文、廣播與郵件中複習各主題詞，記錄詞族及搭配。",
      "checkpoint": "用不同材料自測並能從上下文判讀已學詞。",
      "prerequisites": [
        "v04",
        "v16",
        "v24",
        "v31"
      ],
      "icon": "assets/icons/v32.svg"
    },
    {
      "id": "l01",
      "branch": "listening",
      "lane": 0,
      "level": 0,
      "title": "微聲獵人",
      "topic": "最小對立音辨識",
      "hours": 16,
      "description": "以短音檔比較 /i/–/ɪ/、/æ/–/ɛ/、/r/–/l/ 及字尾音。",
      "checkpoint": "兩次不同短音題組辨音達自訂 80% 門檻。",
      "prerequisites": [
        "f05",
        "f10"
      ],
      "icon": "assets/icons/l01.svg"
    },
    {
      "id": "l02",
      "branch": "listening",
      "lane": 0,
      "level": 1,
      "title": "聲流橋樑",
      "topic": "連音與弱讀辨識",
      "hours": 18,
      "description": "聽出子音接母音、功能詞弱讀、縮讀與常見省音。",
      "checkpoint": "對照逐字稿標出 20 句中的弱讀和連音。",
      "prerequisites": [
        "l01"
      ],
      "icon": "assets/icons/l02.svg"
    },
    {
      "id": "l03",
      "branch": "listening",
      "lane": 0,
      "level": 2,
      "title": "節奏戰鼓",
      "topic": "句重音與語調",
      "hours": 16,
      "description": "聽辨重讀資訊、對比重音、升降調及說話者態度。",
      "checkpoint": "說明同一句不同重音改變的訊息焦點。",
      "prerequisites": [
        "l02"
      ],
      "icon": "assets/icons/l03.svg"
    },
    {
      "id": "l04",
      "branch": "listening",
      "lane": 0,
      "level": 3,
      "title": "口音旅團",
      "topic": "美英加澳口音入門",
      "hours": 20,
      "description": "使用多說話者材料比較常見母音、節奏與地區用語。",
      "checkpoint": "在已知詞彙材料中適應不同說話者並抓出主旨。",
      "prerequisites": [
        "l02"
      ],
      "icon": "assets/icons/l04.svg"
    },
    {
      "id": "l05",
      "branch": "listening",
      "lane": 0,
      "level": 4,
      "title": "數字捕手",
      "topic": "數字、時間與金額聽辨",
      "hours": 16,
      "description": "聽寫電話、日期、價格、小數、折扣及班次。",
      "checkpoint": "區分 -teen/-ty 並準確記錄關鍵數字。",
      "prerequisites": [
        "l01",
        "f15"
      ],
      "icon": "assets/icons/l05.svg"
    },
    {
      "id": "l06",
      "branch": "listening",
      "lane": 0,
      "level": 5,
      "title": "回聲鍛鍊",
      "topic": "短句聽寫與跟讀",
      "hours": 20,
      "description": "每次以 5–15 秒片段先聽寫、比對稿、分析漏音再跟讀。",
      "checkpoint": "能指出漏聽是詞彙、發音還是速度問題。",
      "prerequisites": [
        "l05"
      ],
      "icon": "assets/icons/l06.svg"
    },
    {
      "id": "l07",
      "branch": "listening",
      "lane": 0,
      "level": 6,
      "title": "長音耐力",
      "topic": "持續聽力與筆記",
      "hours": 20,
      "description": "逐步從 30 秒增加到數分鐘，記錄人物、目的、原因與下一步。",
      "checkpoint": "聽完一段新材料後用關鍵字重述重點。",
      "prerequisites": [
        "l06"
      ],
      "icon": "assets/icons/l07.svg"
    },
    {
      "id": "l08",
      "branch": "listening",
      "lane": 1,
      "level": 1,
      "title": "映像斥候",
      "topic": "Part 1 人物動作",
      "hours": 16,
      "description": "聽人物姿態、動作、衣著與動詞 -ing，對照圖片排除錯誤。",
      "checkpoint": "能說出每個選項和照片相符或不符的原因。",
      "prerequisites": [
        "l01",
        "f24"
      ],
      "icon": "assets/icons/l08.svg"
    },
    {
      "id": "l09",
      "branch": "listening",
      "lane": 1,
      "level": 2,
      "title": "靜物觀測",
      "topic": "Part 1 物件與場景",
      "hours": 16,
      "description": "辨認物件位置、狀態、被動進行及相似發音陷阱。",
      "checkpoint": "對照照片區分正在被做與已處於某狀態。",
      "prerequisites": [
        "l08",
        "g20"
      ],
      "icon": "assets/icons/l09.svg"
    },
    {
      "id": "l10",
      "branch": "listening",
      "lane": 1,
      "level": 3,
      "title": "疑問守門",
      "topic": "Part 2 疑問詞問答",
      "hours": 18,
      "description": "聽句首 who/when/where/why/how，預測回答資訊類型。",
      "checkpoint": "能先判斷問題在問人、時、地、原因或方法。",
      "prerequisites": [
        "l01",
        "f22"
      ],
      "icon": "assets/icons/l10.svg"
    },
    {
      "id": "l11",
      "branch": "listening",
      "lane": 1,
      "level": 4,
      "title": "應答之盾",
      "topic": "Part 2 是非與選擇問句",
      "hours": 18,
      "description": "練習一般、否定、附加及選擇問句，避免只等 yes/no。",
      "checkpoint": "能理解不同問句並選出自然回應。",
      "prerequisites": [
        "l10",
        "f23"
      ],
      "icon": "assets/icons/l11.svg"
    },
    {
      "id": "l12",
      "branch": "listening",
      "lane": 1,
      "level": 5,
      "title": "弦外之音",
      "topic": "Part 2 間接回答",
      "hours": 20,
      "description": "理解不知道、轉問別人、改變安排及暗示式回應。",
      "checkpoint": "能解釋未直接回答仍然合理的原因。",
      "prerequisites": [
        "l10"
      ],
      "icon": "assets/icons/l12.svg"
    },
    {
      "id": "l13",
      "branch": "listening",
      "lane": 1,
      "level": 6,
      "title": "迷音破除",
      "topic": "Part 2 干擾選項",
      "hours": 18,
      "description": "分析重複字、相近音、答非所問與時態人稱錯配。",
      "checkpoint": "建立干擾類型錯題紀錄並用新題驗證。",
      "prerequisites": [
        "l10"
      ],
      "icon": "assets/icons/l13.svg"
    },
    {
      "id": "l14",
      "branch": "listening",
      "lane": 1,
      "level": 7,
      "title": "應答連戰",
      "topic": "Part 1–2 混合限時",
      "hours": 20,
      "description": "以不同合法練習材料連續作答，重聽錯題並按原因分類。",
      "checkpoint": "在不暫停的練習中維持注意力並追蹤正確率。",
      "prerequisites": [
        "l09",
        "l11",
        "l12",
        "l13"
      ],
      "icon": "assets/icons/l14.svg"
    },
    {
      "id": "l15",
      "branch": "listening",
      "lane": 2,
      "level": 2,
      "title": "雙人密語",
      "topic": "Part 3 對話主旨與人物",
      "hours": 18,
      "description": "辨認職業、關係、地點、來意及對話主題。",
      "checkpoint": "以線索說明兩人身分及對話目的。",
      "prerequisites": [
        "l02",
        "f24"
      ],
      "icon": "assets/icons/l15.svg"
    },
    {
      "id": "l16",
      "branch": "listening",
      "lane": 2,
      "level": 3,
      "title": "線索先知",
      "topic": "Part 3 預讀題目",
      "hours": 16,
      "description": "在音檔前快速讀題，預測要聽人物、原因、時間或行動。",
      "checkpoint": "能在不翻譯全文下圈出每題關鍵資訊。",
      "prerequisites": [
        "l15"
      ],
      "icon": "assets/icons/l16.svg"
    },
    {
      "id": "l17",
      "branch": "listening",
      "lane": 2,
      "level": 4,
      "title": "細節追蹤",
      "topic": "Part 3 細節與順序",
      "hours": 20,
      "description": "追蹤行程、訂單、困難、建議及方案變動。",
      "checkpoint": "分辨原計畫和最後決定，避免抓到錯誤時間點。",
      "prerequisites": [
        "l16"
      ],
      "icon": "assets/icons/l17.svg"
    },
    {
      "id": "l18",
      "branch": "listening",
      "lane": 2,
      "level": 5,
      "title": "三方盟談",
      "topic": "Part 3 三人對話",
      "hours": 18,
      "description": "用聲音及話語辨認三位說話者，追蹤各自立場。",
      "checkpoint": "能把人物、問題與建議正確配對。",
      "prerequisites": [
        "l15"
      ],
      "icon": "assets/icons/l18.svg"
    },
    {
      "id": "l19",
      "branch": "listening",
      "lane": 2,
      "level": 6,
      "title": "隱意洞察",
      "topic": "Part 3 意圖與推論",
      "hours": 20,
      "description": "從上下文解釋反問、婉拒、驚訝與暗示的下一步。",
      "checkpoint": "用前後句支持推論而非憑常識猜測。",
      "prerequisites": [
        "l15",
        "l16"
      ],
      "icon": "assets/icons/l19.svg"
    },
    {
      "id": "l20",
      "branch": "listening",
      "lane": 2,
      "level": 7,
      "title": "圖表協同",
      "topic": "Part 3 圖表整合",
      "hours": 20,
      "description": "將對話中的條件與表格、價目表、地圖或時刻表交叉比對。",
      "checkpoint": "能指出音訊條件對應的圖表位置與答案。",
      "prerequisites": [
        "l17"
      ],
      "icon": "assets/icons/l20.svg"
    },
    {
      "id": "l21",
      "branch": "listening",
      "lane": 2,
      "level": 8,
      "title": "對話試煉",
      "topic": "Part 3 完整題組",
      "hours": 20,
      "description": "連續完成多組對話，檢查預讀節奏並逐題回溯證據。",
      "checkpoint": "在不中斷播放下完成題組並整理主要失分原因。",
      "prerequisites": [
        "l18",
        "l19",
        "l20"
      ],
      "icon": "assets/icons/l21.svg"
    },
    {
      "id": "l22",
      "branch": "listening",
      "lane": 3,
      "level": 2,
      "title": "廣播信標",
      "topic": "Part 4 公告與廣播",
      "hours": 18,
      "description": "練習車站、機場、商店、天候及公共場所公告。",
      "checkpoint": "能聽出公告對象、原因、時間與行動指示。",
      "prerequisites": [
        "l02",
        "f24"
      ],
      "icon": "assets/icons/l22.svg"
    },
    {
      "id": "l23",
      "branch": "listening",
      "lane": 3,
      "level": 3,
      "title": "留聲水晶",
      "topic": "Part 4 電話留言",
      "hours": 18,
      "description": "聽留言者身分、來電原因、回電資訊及變更安排。",
      "checkpoint": "能記錄要聯絡誰、何時及為何聯絡。",
      "prerequisites": [
        "l22"
      ],
      "icon": "assets/icons/l23.svg"
    },
    {
      "id": "l24",
      "branch": "listening",
      "lane": 3,
      "level": 4,
      "title": "講壇火炬",
      "topic": "Part 4 演講與導覽",
      "hours": 20,
      "description": "練習介紹、致詞、工作簡報及導覽，辨認段落轉換。",
      "checkpoint": "能按開頭、細節及結尾重述短講重點。",
      "prerequisites": [
        "l22"
      ],
      "icon": "assets/icons/l24.svg"
    },
    {
      "id": "l25",
      "branch": "listening",
      "lane": 3,
      "level": 5,
      "title": "傳播號角",
      "topic": "Part 4 廣告與新聞",
      "hours": 18,
      "description": "辨認產品賣點、優惠條件、新聞事件與報導焦點。",
      "checkpoint": "區分核心訊息和附帶例子並找出行動要求。",
      "prerequisites": [
        "l22"
      ],
      "icon": "assets/icons/l25.svg"
    },
    {
      "id": "l26",
      "branch": "listening",
      "lane": 3,
      "level": 6,
      "title": "聽圖共鳴",
      "topic": "Part 4 圖表與推論",
      "hours": 20,
      "description": "整合短講與圖表資訊，從上下文理解說話意圖。",
      "checkpoint": "能以音訊及圖表兩個來源共同支持答案。",
      "prerequisites": [
        "l24"
      ],
      "icon": "assets/icons/l26.svg"
    },
    {
      "id": "l27",
      "branch": "listening",
      "lane": 3,
      "level": 7,
      "title": "長夜守望",
      "topic": "Part 4 完整題組",
      "hours": 20,
      "description": "練習預讀、連續作答和失誤後回到下一題，整理詞彙及漏音。",
      "checkpoint": "在不同題組中追蹤主旨、細節及推論表現。",
      "prerequisites": [
        "l23",
        "l25",
        "l26"
      ],
      "icon": "assets/icons/l27.svg"
    },
    {
      "id": "l28",
      "branch": "listening",
      "lane": 3,
      "level": 9,
      "title": "聆聽總試煉",
      "topic": "完整聽力限時診斷",
      "hours": 20,
      "description": "以合法完整模擬題練習約 45 分鐘聽力，剩餘時間做錯因分析與重聽。",
      "checkpoint": "保留不同題本的原始答對率，不自行換算官方量尺分數。",
      "prerequisites": [
        "l07",
        "l14",
        "l21",
        "l27"
      ],
      "icon": "assets/icons/l28.svg"
    },
    {
      "id": "r01",
      "branch": "reading",
      "lane": 0,
      "level": 0,
      "title": "詞位偵察",
      "topic": "Part 5 詞性判斷",
      "hours": 18,
      "description": "先看空格前後結構，分辨缺少名詞、動詞、形容詞或副詞。",
      "checkpoint": "能在選答案前說明空格需要的語法功能。",
      "prerequisites": [
        "g05",
        "g11"
      ],
      "icon": "assets/icons/r01.svg"
    },
    {
      "id": "r02",
      "branch": "reading",
      "lane": 0,
      "level": 1,
      "title": "時態望塔",
      "topic": "Part 5 動詞與一致",
      "hours": 18,
      "description": "依主詞、時間線索、語態與主謂一致判斷動詞。",
      "checkpoint": "能指出每題真正主詞和時態或語態依據。",
      "prerequisites": [
        "r01",
        "g10",
        "g20"
      ],
      "icon": "assets/icons/r02.svg"
    },
    {
      "id": "r03",
      "branch": "reading",
      "lane": 0,
      "level": 2,
      "title": "連結工藝",
      "topic": "Part 5 介系詞與連接詞",
      "hours": 18,
      "description": "比較後接名詞或子句，整理時間、因果、讓步與條件訊號。",
      "checkpoint": "能以結構與意思同時排除錯誤選項。",
      "prerequisites": [
        "r01",
        "g07",
        "g23"
      ],
      "icon": "assets/icons/r03.svg"
    },
    {
      "id": "r04",
      "branch": "reading",
      "lane": 0,
      "level": 3,
      "title": "詞義鑑定",
      "topic": "Part 5 詞彙與搭配",
      "hours": 20,
      "description": "依語境選擇近義詞、多義詞與固定搭配，記錄完整例句。",
      "checkpoint": "能說明選項的搭配差異而非只背中文意思。",
      "prerequisites": [
        "r01",
        "v28",
        "v30"
      ],
      "icon": "assets/icons/r04.svg"
    },
    {
      "id": "r05",
      "branch": "reading",
      "lane": 0,
      "level": 4,
      "title": "段落修補",
      "topic": "Part 6 上下文填空",
      "hours": 18,
      "description": "從前後句判斷時態、人稱、指示詞與轉折，避免只讀單句。",
      "checkpoint": "能為答案引用段落中的呼應線索。",
      "prerequisites": [
        "f24",
        "g23"
      ],
      "icon": "assets/icons/r05.svg"
    },
    {
      "id": "r06",
      "branch": "reading",
      "lane": 0,
      "level": 5,
      "title": "拼接卷軸",
      "topic": "Part 6 句子插入",
      "hours": 18,
      "description": "利用主題句、代名詞指涉、因果及時間順序選句。",
      "checkpoint": "能說明插入句如何接上前句並引出後句。",
      "prerequisites": [
        "r05"
      ],
      "icon": "assets/icons/r06.svg"
    },
    {
      "id": "r07",
      "branch": "reading",
      "lane": 0,
      "level": 6,
      "title": "填空連戰",
      "topic": "Part 5–6 限時整合",
      "hours": 20,
      "description": "交錯練習詞性、文法與段落題，記錄每題耗時和猶豫原因。",
      "checkpoint": "在固定自訂時間內完成且能回顧錯誤類型。",
      "prerequisites": [
        "r02",
        "r03",
        "r04",
        "r06"
      ],
      "icon": "assets/icons/r07.svg"
    },
    {
      "id": "r08",
      "branch": "reading",
      "lane": 1,
      "level": 0,
      "title": "信函塔門",
      "topic": "Part 7 郵件與信函",
      "hours": 18,
      "description": "辨認寄件人、收件人、目的、請求與附件，找原文證據。",
      "checkpoint": "能用一句話摘要來意並找出需要的回應。",
      "prerequisites": [
        "f24",
        "v12"
      ],
      "icon": "assets/icons/r08.svg"
    },
    {
      "id": "r09",
      "branch": "reading",
      "lane": 1,
      "level": 1,
      "title": "公告石牆",
      "topic": "Part 7 公告與通知",
      "hours": 16,
      "description": "閱讀政策、活動、搬遷及維修通知，標記對象和例外條件。",
      "checkpoint": "找出誰受影響、何時開始以及要做什麼。",
      "prerequisites": [
        "f24",
        "v12"
      ],
      "icon": "assets/icons/r09.svg"
    },
    {
      "id": "r10",
      "branch": "reading",
      "lane": 1,
      "level": 2,
      "title": "廣告櫥窗",
      "topic": "Part 7 廣告與徵才",
      "hours": 18,
      "description": "比較資格、產品特色、價格、優惠和申請辦法。",
      "checkpoint": "區分必要條件、可選條件和促銷限制。",
      "prerequisites": [
        "f24",
        "v12"
      ],
      "icon": "assets/icons/r10.svg"
    },
    {
      "id": "r11",
      "branch": "reading",
      "lane": 1,
      "level": 3,
      "title": "表單檔案",
      "topic": "Part 7 表格與收據",
      "hours": 18,
      "description": "讀懂訂單、發票、時程、表單及票據，對照欄列和註記。",
      "checkpoint": "根據欄位、單位及註記找出精確資訊。",
      "prerequisites": [
        "f24",
        "v12"
      ],
      "icon": "assets/icons/r11.svg"
    },
    {
      "id": "r12",
      "branch": "reading",
      "lane": 1,
      "level": 4,
      "title": "報導長廊",
      "topic": "Part 7 文章與報導",
      "hours": 20,
      "description": "標出主旨、段落功能、事件順序與引述，避免被細節帶偏。",
      "checkpoint": "以段落證據支持主旨題及細節題答案。",
      "prerequisites": [
        "f24",
        "v12"
      ],
      "icon": "assets/icons/r12.svg"
    },
    {
      "id": "r13",
      "branch": "reading",
      "lane": 1,
      "level": 5,
      "title": "訊息交會",
      "topic": "Part 7 即時通訊",
      "hours": 16,
      "description": "追蹤短訊息中的人物、時間戳記、口語省略與意圖。",
      "checkpoint": "辨認最後決定及某句話在對話中的作用。",
      "prerequisites": [
        "f24",
        "v12"
      ],
      "icon": "assets/icons/r13.svg"
    },
    {
      "id": "r14",
      "branch": "reading",
      "lane": 1,
      "level": 6,
      "title": "單篇探索試煉",
      "topic": "單篇混合閱讀",
      "hours": 20,
      "description": "混合單篇題材，練習先辨任務、定位證據、檢查同義改寫。",
      "checkpoint": "記錄不同文類的速度與正確率以安排補強。",
      "prerequisites": [
        "r08",
        "r09",
        "r10",
        "r11",
        "r12",
        "r13"
      ],
      "icon": "assets/icons/r14.svg"
    },
    {
      "id": "r15",
      "branch": "reading",
      "lane": 2,
      "level": 0,
      "title": "俯瞰之眼",
      "topic": "略讀與主旨",
      "hours": 16,
      "description": "快速看標題、首句、轉折與結尾，練習用一句話摘要。",
      "checkpoint": "能在自訂時間內指出文類、目的與主題。",
      "prerequisites": [
        "f24"
      ],
      "icon": "assets/icons/r15.svg"
    },
    {
      "id": "r16",
      "branch": "reading",
      "lane": 2,
      "level": 1,
      "title": "獵鷹索引",
      "topic": "掃讀與定位",
      "hours": 18,
      "description": "依專名、數字、日期和同義線索找資訊，避免從頭反覆翻譯。",
      "checkpoint": "能標記問題對應的原文位置並確認上下文。",
      "prerequisites": [
        "r15"
      ],
      "icon": "assets/icons/r16.svg"
    },
    {
      "id": "r17",
      "branch": "reading",
      "lane": 2,
      "level": 2,
      "title": "換形密碼",
      "topic": "同義改寫辨識",
      "hours": 20,
      "description": "比較題幹、選項與原文在詞彙、語態及句型上的改寫。",
      "checkpoint": "能用原文意思驗證選項而非只找相同單字。",
      "prerequisites": [
        "r16"
      ],
      "icon": "assets/icons/r17.svg"
    },
    {
      "id": "r18",
      "branch": "reading",
      "lane": 2,
      "level": 3,
      "title": "指涉追光",
      "topic": "代名詞與脈絡詞義",
      "hours": 18,
      "description": "沿前後句追蹤 it/they/this 等指涉，依上下文判讀多義字。",
      "checkpoint": "能說明指涉對象及選字的語境依據。",
      "prerequisites": [
        "r15",
        "g04"
      ],
      "icon": "assets/icons/r18.svg"
    },
    {
      "id": "r19",
      "branch": "reading",
      "lane": 2,
      "level": 4,
      "title": "推論燈塔",
      "topic": "推論、目的與態度",
      "hours": 20,
      "description": "區分原文事實與合理推論，理解作者目的、暗示和語氣。",
      "checkpoint": "能指出支持推論的線索並排除過度推論。",
      "prerequisites": [
        "r15",
        "r17"
      ],
      "icon": "assets/icons/r19.svg"
    },
    {
      "id": "r20",
      "branch": "reading",
      "lane": 2,
      "level": 5,
      "title": "句序織匠",
      "topic": "句子插入與段落銜接",
      "hours": 18,
      "description": "追蹤代名詞、連接詞、例子及先後順序判斷插入位置。",
      "checkpoint": "能解釋每個候選位置的銜接是否自然。",
      "prerequisites": [
        "r18",
        "g23"
      ],
      "icon": "assets/icons/r20.svg"
    },
    {
      "id": "r21",
      "branch": "reading",
      "lane": 2,
      "level": 6,
      "title": "陷阱破陣",
      "topic": "NOT 題與干擾分析",
      "hours": 18,
      "description": "分析反向問題、張冠李戴、部分正確和原文未提及選項。",
      "checkpoint": "能為每個錯誤選項標記具體問題。",
      "prerequisites": [
        "r16",
        "r19",
        "r20"
      ],
      "icon": "assets/icons/r21.svg"
    },
    {
      "id": "r22",
      "branch": "reading",
      "lane": 3,
      "level": 7,
      "title": "雙卷盟約",
      "topic": "雙篇交叉資訊",
      "hours": 20,
      "description": "將郵件與廣告、通知與表格交叉閱讀，標出共同人物與事項。",
      "checkpoint": "能指出需要哪兩處證據才能得出答案。",
      "prerequisites": [
        "r14",
        "r17"
      ],
      "icon": "assets/icons/r22.svg"
    },
    {
      "id": "r23",
      "branch": "reading",
      "lane": 3,
      "level": 8,
      "title": "三塔連線",
      "topic": "三篇交叉資訊",
      "hours": 20,
      "description": "先辨識三篇用途，追蹤訂單、改期、補充條件與最後結果。",
      "checkpoint": "建立三篇資訊小表並找出跨篇結論。",
      "prerequisites": [
        "r22"
      ],
      "icon": "assets/icons/r23.svg"
    },
    {
      "id": "r24",
      "branch": "reading",
      "lane": 3,
      "level": 9,
      "title": "時序迷宮",
      "topic": "變更與條件整合",
      "hours": 20,
      "description": "比較原訂與更改後時間、人物、價格、例外與資格。",
      "checkpoint": "能分辨仍然有效的條件與被取代的資訊。",
      "prerequisites": [
        "r23"
      ],
      "icon": "assets/icons/r24.svg"
    },
    {
      "id": "r25",
      "branch": "reading",
      "lane": 3,
      "level": 10,
      "title": "證據雙刃",
      "topic": "多篇推論與計算",
      "hours": 20,
      "description": "整合資格、數量、折扣及時間，練習合理簡單計算和推論。",
      "checkpoint": "每題列出所用證據並檢查單位及例外。",
      "prerequisites": [
        "r24",
        "r07"
      ],
      "icon": "assets/icons/r25.svg"
    },
    {
      "id": "r26",
      "branch": "reading",
      "lane": 3,
      "level": 11,
      "title": "疾讀步法",
      "topic": "閱讀配速練習",
      "hours": 20,
      "description": "分段限時、記錄停滯原因，建立不會題暫跳與回查策略。",
      "checkpoint": "根據個人紀錄安排 Part 5–7 時間而非盲目求快。",
      "prerequisites": [
        "r25"
      ],
      "icon": "assets/icons/r26.svg"
    },
    {
      "id": "r27",
      "branch": "reading",
      "lane": 3,
      "level": 12,
      "title": "連卷遠行",
      "topic": "多篇連續題組",
      "hours": 20,
      "description": "連續完成多篇題組，練習切換文類及失分後維持節奏。",
      "checkpoint": "在不同材料追蹤跨篇題正確率與耗時。",
      "prerequisites": [
        "r26"
      ],
      "icon": "assets/icons/r27.svg"
    },
    {
      "id": "r28",
      "branch": "reading",
      "lane": 3,
      "level": 13,
      "title": "閱讀總試煉",
      "topic": "完整閱讀限時診斷",
      "hours": 20,
      "description": "以合法完整模擬題練習 75 分鐘閱讀，整理未完成及猜測題。",
      "checkpoint": "保存題本、答對數及各部分耗時，不自行套用固定換分表。",
      "prerequisites": [
        "r07",
        "r21",
        "r27"
      ],
      "icon": "assets/icons/r28.svg"
    },
    {
      "id": "e01",
      "branch": "expedition",
      "lane": 0,
      "level": 0,
      "title": "遠征地圖",
      "topic": "測驗規則與起點診斷",
      "hours": 10,
      "description": "認識傳統 TOEIC L&R 七大題型與聽力 45 分鐘、閱讀 75 分鐘，完成起點診斷。",
      "checkpoint": "記錄起點與弱項；明白學習點數不能推算分數。",
      "prerequisites": [
        "f24"
      ],
      "icon": "assets/icons/e01.svg"
    },
    {
      "id": "e02",
      "branch": "expedition",
      "lane": 0,
      "level": 1,
      "title": "裂隙修補",
      "topic": "基礎錯因補強",
      "hours": 20,
      "description": "依診斷挑選發音、核心詞彙或基本句型，每次只補一類並換題驗證。",
      "checkpoint": "建立錯因、補強行動與新題結果三欄紀錄。",
      "prerequisites": [
        "e01"
      ],
      "icon": "assets/icons/e02.svg"
    },
    {
      "id": "e03",
      "branch": "expedition",
      "lane": 0,
      "level": 2,
      "title": "記憶護城",
      "topic": "複習排程與錯題循環",
      "hours": 18,
      "description": "安排每週新學、回想和複測，避免只重做已背答案的題目。",
      "checkpoint": "完成四週排程並有不同題組的複測紀錄。",
      "prerequisites": [
        "e02"
      ],
      "icon": "assets/icons/e03.svg"
    },
    {
      "id": "e04",
      "branch": "expedition",
      "lane": 0,
      "level": 3,
      "title": "中繼營地",
      "topic": "階段診斷與計畫調整",
      "hours": 20,
      "description": "重做不同來源診斷，按 Part 和錯因重新分配下一階段時間。",
      "checkpoint": "能以紀錄說明已改善部分與下一個補強目標。",
      "prerequisites": [
        "e03"
      ],
      "icon": "assets/icons/e04.svg"
    },
    {
      "id": "e05",
      "branch": "expedition",
      "lane": 1,
      "level": 0,
      "title": "聽音淬火",
      "topic": "高難聽力錯因分析",
      "hours": 20,
      "description": "對近期錯題逐句聽寫、定位同義改寫，辨認漏音和理解問題。",
      "checkpoint": "為每道錯題留下原音線索與修正方法。",
      "prerequisites": [
        "l14",
        "l21",
        "l28"
      ],
      "icon": "assets/icons/e05.svg"
    },
    {
      "id": "e06",
      "branch": "expedition",
      "lane": 1,
      "level": 1,
      "title": "萬聲歸流",
      "topic": "口音與語速精修",
      "hours": 20,
      "description": "選可理解的職場材料交錯多口音，先重點聽再無稿復述。",
      "checkpoint": "在新音檔中維持主旨與細節理解並記錄卡點。",
      "prerequisites": [
        "e05"
      ],
      "icon": "assets/icons/e06.svg"
    },
    {
      "id": "e07",
      "branch": "expedition",
      "lane": 1,
      "level": 2,
      "title": "瞬息決策",
      "topic": "高難推論與預讀",
      "hours": 20,
      "description": "交錯意圖題、圖表題和三人對話，調整預讀與聆聽切換。",
      "checkpoint": "能在不中斷播放時用上下文支持推論。",
      "prerequisites": [
        "e06"
      ],
      "icon": "assets/icons/e07.svg"
    },
    {
      "id": "e08",
      "branch": "expedition",
      "lane": 1,
      "level": 3,
      "title": "聽力封關",
      "topic": "聽力複測與補強",
      "hours": 20,
      "description": "用不同完整題組複測，將剩餘時間用於高頻錯因補強。",
      "checkpoint": "保存至少兩次不同題本紀錄並比較弱項變化。",
      "prerequisites": [
        "e07"
      ],
      "icon": "assets/icons/e08.svg"
    },
    {
      "id": "e09",
      "branch": "expedition",
      "lane": 2,
      "level": 0,
      "title": "語法磨刃",
      "topic": "高難語法與搭配補強",
      "hours": 20,
      "description": "針對長句、詞性、子句與搭配錯題重新拆解，再做不同題目。",
      "checkpoint": "能解釋答案及其他選項不成立的結構原因。",
      "prerequisites": [
        "r07",
        "r21",
        "r28"
      ],
      "icon": "assets/icons/e09.svg"
    },
    {
      "id": "e10",
      "branch": "expedition",
      "lane": 2,
      "level": 1,
      "title": "交叉洞察",
      "topic": "高難多篇證據整合",
      "hours": 20,
      "description": "以陌生職場材料練習跨篇條件、變更資訊與同義改寫。",
      "checkpoint": "每題可回指證據，不依背景常識補出不存在資訊。",
      "prerequisites": [
        "e09"
      ],
      "icon": "assets/icons/e10.svg"
    },
    {
      "id": "e11",
      "branch": "expedition",
      "lane": 2,
      "level": 2,
      "title": "七十五之沙",
      "topic": "75 分鐘閱讀配速",
      "hours": 20,
      "description": "依個人速度設定檢查點，練習暫跳、回查與保留填答時間。",
      "checkpoint": "完成兩次不同題本並記錄未完成題及各部分時間。",
      "prerequisites": [
        "e10"
      ],
      "icon": "assets/icons/e11.svg"
    },
    {
      "id": "e12",
      "branch": "expedition",
      "lane": 2,
      "level": 3,
      "title": "閱讀封關",
      "topic": "閱讀複測與補強",
      "hours": 20,
      "description": "在不同完整題組中驗證改善，補強反覆出現的閱讀錯因。",
      "checkpoint": "保存至少兩次新題紀錄及後續補強清單。",
      "prerequisites": [
        "e11"
      ],
      "icon": "assets/icons/e12.svg"
    },
    {
      "id": "e13",
      "branch": "expedition",
      "lane": 3,
      "level": 4,
      "title": "雙域合擊",
      "topic": "完整模擬與耐力一",
      "hours": 16,
      "description": "以合法取得的傳統完整模擬題連續練習聽力及閱讀，包含檢討。",
      "checkpoint": "記錄兩小時注意力、答題節奏及主要失分位置。",
      "prerequisites": [
        "e04",
        "e08",
        "e12"
      ],
      "icon": "assets/icons/e13.svg"
    },
    {
      "id": "e14",
      "branch": "expedition",
      "lane": 3,
      "level": 5,
      "title": "遠征再臨",
      "topic": "完整模擬與耐力二",
      "hours": 16,
      "description": "用另一份未做過的完整題本複測，將額外時間投入錯題檢討。",
      "checkpoint": "比較兩次表現，避免將熟題進步當作能力進步。",
      "prerequisites": [
        "e13"
      ],
      "icon": "assets/icons/e14.svg"
    },
    {
      "id": "e15",
      "branch": "expedition",
      "lane": 3,
      "level": 6,
      "title": "終戰整備",
      "topic": "考前弱項與作息",
      "hours": 14,
      "description": "以紀錄挑選少量高頻弱項、確認官方應試資訊並安排休息。",
      "checkpoint": "完成應試準備清單與可持續的最後一週排程。",
      "prerequisites": [
        "e14"
      ],
      "icon": "assets/icons/e15.svg"
    },
    {
      "id": "e16",
      "branch": "expedition",
      "lane": 3,
      "level": 7,
      "title": "九百星冠",
      "topic": "900+ 目標檢核與後續計畫",
      "hours": 12,
      "description": "整理可信模考紀錄與正式測驗結果，未達標則新增補強循環；交流目標另開職業。",
      "checkpoint": "以實際測驗結果記錄是否達標；點滿僅表示完成規劃時數。",
      "prerequisites": [
        "e15"
      ],
      "icon": "assets/icons/e16.svg"
    }
  ]
};
