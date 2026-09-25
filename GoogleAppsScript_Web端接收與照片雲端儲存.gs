// =========================================================================
// 聖若瑟教區中學第五校 ‧ 課程發展及教研處
// 【五大學部特色重點課程填報系統 ‧ 後端接收與雲端硬碟照片存檔腳本】
// =========================================================================

// 【★ 第一步：首次授權與開通雲端硬碟權限專用函式】
// 請在編輯器上方選擇此函式，點擊「執行 (Run)」並允許權限，即可立刻在 Google 雲端硬碟看到資料夾！
function 授權與開通雲端硬碟權限() {
  Logger.log('>>> 正在開通 Google 雲端硬碟權限並建立主資料夾...');
  var folder = getOrCreateFolder('五大學部特色課程照片庫');
  try {
    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (e) {
    try { folder.setSharing(DriveApp.Access.DOMAIN_WITH_LINK, DriveApp.Permission.VIEW); } catch (e2) {}
  }
  Logger.log('✓ 成功在 Google 雲端硬碟建立資料夾: ' + folder.getName());
  Logger.log('✓ 資料夾雲端直接網址: ' + folder.getUrl());
  var ss = getOrCreateSpreadsheet();
  Logger.log('✓ 成功連接試算表: ' + ss.getName());
  Logger.log('🎉 恭喜！Google 雲端硬碟權限已全部開通成功！現在主任送出的照片將 100% 自動存入此資料夾！');
}

// 1. 處理網頁檢驗與跨裝置資料同步 (doGet)
function doGet(e) {
  // 跨裝置同步：若請求帶有 action=getLatest，回傳各學部最新填報資料與照片連結
  if (e && e.parameter && e.parameter.action === 'getLatest') {
    try {
      var ss = getOrCreateSpreadsheet();
      var sheet = ss.getActiveSheet();
      var lastRow = sheet.getLastRow();
      if (lastRow <= 1) {
        return ContentService.createTextOutput(JSON.stringify({ status: 'success', data: {} }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      var numCols = Math.min(sheet.getLastColumn(), 21);
      var values = sheet.getRange(2, 1, lastRow - 1, numCols).getValues();
      var result = {};

      for (var r = 0; r < values.length; r++) {
        var row = values[r];
        var secTitle = String(row[1] || '');
        var secKey = '';
        if (secTitle.includes('KGS') || secTitle.includes('幼稚園')) secKey = 'KGS';
        else if (secTitle.includes('PCS') || secTitle.includes('小學中文')) secKey = 'PCS';
        else if (secTitle.includes('PES') || secTitle.includes('小學英文')) secKey = 'PES';
        else if (secTitle.includes('SCS') || secTitle.includes('中學中文')) secKey = 'SCS';
        else if (secTitle.includes('SES') || secTitle.includes('中學英文')) secKey = 'SES';
        else continue;

        result[secKey] = {
          timestamp: row[0],
          sectionTitle: row[1],
          director: row[2],
          contact: row[3],
          c1_name: row[4],
          c1_concept: row[5],
          c1_highlights: row[6],
          c1_photo: row[7],
          c1_photos: String(row[8] || '').split('\n').filter(Boolean),
          c2_name: row[9],
          c2_concept: row[10],
          c2_highlights: row[11],
          c2_photo: row[12],
          c2_photos: String(row[13] || '').split('\n').filter(Boolean),
          c3_name: row[14],
          c3_concept: row[15],
          c3_highlights: row[16],
          c3_photo: row[17],
          c3_photos: String(row[18] || '').split('\n').filter(Boolean),
          notes: row[19] || '',
          folderUrl: row[20] || ''
        };
      }

      return ContentService.createTextOutput(JSON.stringify({ status: 'success', data: result }))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  var html = '' +
    '<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
    '  <meta charset="utf-8">' +
    '  <title>CDSJ5 特色課程資料接收服務</title>' +
    '  <style>' +
    '    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 90vh; background: #f8fafc; margin: 0; }' +
    '    .card { background: white; padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); text-align: center; max-width: 480px; }' +
    '    .badge { display: inline-block; background: #e0f2fe; color: #0284c7; padding: 6px 14px; border-radius: 9999px; font-weight: bold; font-size: 13px; margin-bottom: 16px; }' +
    '    h2 { color: #0f172a; margin: 0 0 10px 0; font-size: 22px; }' +
    '    p { color: #64748b; font-size: 14px; line-height: 1.6; margin-bottom: 24px; }' +
    '    .btn { display: inline-block; background: #2563eb; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; }' +
    '  </style>' +
    '</head>' +
    '<body>' +
    '  <div class="card">' +
    '    <span class="badge">● 雲端接收服務運作正常</span>' +
    '    <h2>聖若瑟教區中學第五校</h2>' +
    '    <p>五大學部特色重點課程填報系統之後端 Web App 服務已就緒。<br>支援資料自動存表、雲端硬碟存圖、以及線上即時同步拉取。</p>' +
    '    <a class="btn" href="https://jtchen1225-a11y.github.io/cdsj5-section-features/" target="_blank">前往線上填報系統</a>' +
    '  </div>' +
    '</body>' +
    '</html>';
  return HtmlService.createHtmlOutput(html).setTitle('CDSJ5 填報接收服務');
}

// 2. 接收填報資料與照片並存入雲端硬碟 (doPost)
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);

  try {
    var data = JSON.parse(e.postData.contents);

    // 取得當前試算表與工作表
    var ss = getOrCreateSpreadsheet();
    var sheet = ss.getActiveSheet();

    // 確保表頭具備 21 個完整欄位（含照片連結）
    ensureHeaders(sheet);

    // 取得或在雲端硬碟建立照片總資料夾
    var rootFolder = getOrCreateFolder('五大學部特色課程照片庫');
    var timestampStr = Utilities.formatDate(new Date(), 'GMT+8', 'yyyy-MM-dd HH:mm:ss');
    var subfolderName = '[' + data.sectionKey + '] ' + (data.director || '未填負責人') + ' (' + Utilities.formatDate(new Date(), 'GMT+8', 'yyyyMMdd_HHmm') + ')';
    var sectionFolder = null;

    var c1PhotoLinks = [];
    var c2PhotoLinks = [];
    var c3PhotoLinks = [];

    // 若有上傳任何照片，自動建立該主任的專屬子資料夾
    var hasAnyImages = (data.c1_images && data.c1_images.length > 0) ||
                       (data.c2_images && data.c2_images.length > 0) ||
                       (data.c3_images && data.c3_images.length > 0);

    if (hasAnyImages) {
      sectionFolder = rootFolder.createFolder(subfolderName);
      try {
        sectionFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      } catch (errF) {
        try { sectionFolder.setSharing(DriveApp.Access.DOMAIN_WITH_LINK, DriveApp.Permission.VIEW); } catch (eF2) {}
      }
    }

    if (data.c1_images && data.c1_images.length > 0 && sectionFolder) {
      c1PhotoLinks = saveImagesToFolder(sectionFolder, data.c1_images, '課程1');
    }
    if (data.c2_images && data.c2_images.length > 0 && sectionFolder) {
      c2PhotoLinks = saveImagesToFolder(sectionFolder, data.c2_images, '課程2');
    }
    if (data.c3_images && data.c3_images.length > 0 && sectionFolder) {
      c3PhotoLinks = saveImagesToFolder(sectionFolder, data.c3_images, '課程3');
    }

    // 寫入試算表資料列（共 21 個欄位）
    var rowData = [
      timestampStr,
      data.sectionTitle || data.sectionKey,
      data.director || '',
      data.contact || '',

      // 課程 1
      data.c1_name || '',
      data.c1_concept || '',
      data.c1_highlights || '',
      data.c1_photo || '',
      c1PhotoLinks.join('\n'),

      // 課程 2
      data.c2_name || '',
      data.c2_concept || '',
      data.c2_highlights || '',
      data.c2_photo || '',
      c2PhotoLinks.join('\n'),

      // 課程 3
      data.c3_name || '',
      data.c3_concept || '',
      data.c3_highlights || '',
      data.c3_photo || '',
      c3PhotoLinks.join('\n'),

      // 備註與照片資料夾超連結
      data.notes || '',
      sectionFolder ? sectionFolder.getUrl() : '無上傳照片'
    ];

    sheet.appendRow(rowData);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: '資料及照片已成功儲存至 Google 試算表與雲端硬碟！',
      folderUrl: sectionFolder ? sectionFolder.getUrl() : null
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// 輔助函式：解碼 Base64 並存入雲端資料夾
function saveImagesToFolder(folder, imageList, prefix) {
  var urls = [];
  for (var i = 0; i < imageList.length; i++) {
    try {
      var img = imageList[i];
      if (!img.dataUrl) continue;
      var parts = img.dataUrl.split(',');
      var meta = parts[0];
      var base64Data = parts[1];
      var contentType = meta.split(';')[0].replace('data:', '') || 'image/jpeg';
      var ext = contentType.includes('png') ? '.png' : '.jpg';
      var fileName = prefix + '_照片' + (i + 1) + (img.name ? ('_' + img.name) : ext);

      var decodedBlob = Utilities.newBlob(Utilities.base64Decode(base64Data), contentType, fileName);
      var file = folder.createFile(decodedBlob);
      try {
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      } catch (errShare) {
        try { file.setSharing(DriveApp.Access.DOMAIN_WITH_LINK, DriveApp.Permission.VIEW); } catch (errShare2) {}
      }
      // 產生直接可在網頁 img 標籤顯示且可在試算表點擊開啟的高解析縮圖網址
      var directImgUrl = 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w1200';
      urls.push(directImgUrl);
    } catch (e) {
      Logger.log('儲存照片失敗: ' + e.toString());
    }
  }
  return urls;
}

// 取得試算表
function getOrCreateSpreadsheet() {
  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (e) {}
  var files = DriveApp.getFilesByName('聖若瑟五校 ‧ 五大學部特色重點課程填報匯總表');
  if (files.hasNext()) return SpreadsheetApp.open(files.next());
  return SpreadsheetApp.create('聖若瑟五校 ‧ 五大學部特色重點課程填報匯總表');
}

// 取得或建立雲端資料夾（含防呆預設值，直接點選執行也不會報錯）
function getOrCreateFolder(folderName) {
  var targetName = (typeof folderName === 'string' && folderName.trim()) ? folderName.trim() : '五大學部特色課程照片庫';
  var folders = DriveApp.getFoldersByName(targetName);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(targetName);
}

// 自動維護表頭
function ensureHeaders(sheet) {
  var headers = [
    '填報時間', '學部名稱', '填報主任', '聯絡方式',
    '課程1-名稱', '課程1-核心理念', '課程1-三大亮點', '課程1-照片需求', '課程1-上傳照片連結',
    '課程2-名稱', '課程2-核心理念', '課程2-三大亮點', '課程2-照片需求', '課程2-上傳照片連結',
    '課程3-名稱', '課程3-核心理念', '課程3-三大亮點', '課程3-照片需求', '課程3-上傳照片連結',
    '學部備註與建議', '照片專屬資料夾'
  ];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setBackground('#1e293b').setFontColor('#ffffff').setFontWeight('bold');
    sheet.setFrozenRows(1);
  } else if (sheet.getLastColumn() < headers.length) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setBackground('#1e293b').setFontColor('#ffffff').setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
}
