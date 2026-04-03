// Shared small catalog used by Search/Category pages
// (not the big `books` array inside chitiet.html).
(function () {
    const assetsPrefix = window.ayaAssetsPrefix || "./assets/";
    window.booksData = [
        { id: 'nina', name: 'Nina ở thị trấn cao nguyên - Tập 2', price: '34,200đ', img: `${assetsPrefix}img/trangchu/nina.png`, category: 'manga' },
        { id: 'tet', name: 'Những ngày tết ta', price: '81,000đ', img: `${assetsPrefix}img/trangchu/tet.png`, category: 'thieunhi' },
        { id: 'worldtrigger', name: 'World Trigger - Tập 4', price: '31,500đ', img: `${assetsPrefix}img/trangchu/worldtrigger.png`, category: 'manga' },
        { id: 'bantusach', name: 'Những người bạn từ trang sách', price: '85,500đ', img: `${assetsPrefix}img/trangchu/bantusach.png`, category: 'tieuthuyet' },
        { id: 'shin', name: 'Shin - Cậu bé bút chì - Tập 1', price: '19,500đ', img: `${assetsPrefix}img/trangchu/shin.png`, category: 'manga' },
        { id: 'naruto', name: 'Naruto - Quyển 20', price: '21,000đ', img: `${assetsPrefix}img/trangchu/naruto.png`, category: 'manga' },
        { id: 'onepi', name: 'One Piece - Tập 101', price: '25,000đ', img: `${assetsPrefix}img/trangchu/onepi.png`, category: 'manga' },
        { id: 'akutami', name: 'Chú thuật hồi chiến - Tập 1', price: '30,000đ', img: `${assetsPrefix}img/trangchu/akutami.png`, category: 'manga' },
        { id: 'xebuyt', name: 'XE BUÝT ĐƯA EM ĐI', price: '36,000đ', img: `${assetsPrefix}img/trangchu/xebuyt.png`, category: 'tieuthuyet' },
        { id: 'rantaro', name: 'Ninja Rontaro - Tập 19', price: '36,000đ', img: `${assetsPrefix}img/trangchu/rantaro.png`, category: 'manga' },
        { id: 'drstone', name: 'Doctor Stone - Tập 21', price: '22,500đ', img: `${assetsPrefix}img/trangchu/drstone.png`, category: 'manga' },
        { id: 'doraemondoiquan', name: 'Đội quân Doraemon - Tập 4', price: '19,800đ', img: `${assetsPrefix}img/trangchu/doraemondoiquan.png`, category: 'manga' },
        { id: 'thiendinh', name: 'THIỀN ĐỊNH MỖI NGÀY', price: '118,000đ', img: `${assetsPrefix}img/trangchu/thiendinh.png`, category: 'kynang' },
        { id: 'tute', name: 'MỘT NĂM SỐNG TỬ TẾ', price: '168,000đ', img: `${assetsPrefix}img/trangchu/tute.png`, category: 'kynang' }, 
        { id: 'sohoc', name: 'THAY ĐỔI CUỘC SỐNG VỚI NHÂN SỐ HỌC', price: '181,040đ', img: `${assetsPrefix}img/trangchu/sohoc.png`, category: 'kynang' },
        { id: 'damnghi', name: 'DÁM NGHĨ LẠI', price: '117,600đ', img: `${assetsPrefix}img/trangchu/damnghi.png`, category: 'kynang' }
    ];
})();
