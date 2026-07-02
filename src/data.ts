/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Character } from './types';

/**
 * HƯỚNG DẪN THAY ĐỔI DỮ LIỆU NHÂN VẬT (DÀNH CHO CREATOR SHIN):
 * Bạn có thể dễ dàng sửa, thêm hoặc xóa bớt nhân vật ở đây.
 * Mỗi nhân vật có các trường thông tin sau:
 * - id: Mã định danh duy nhất (ví dụ: 'char-1', 'char-2')
 * - name: Tên của nhân vật chatbot
 * - title: Biệt danh / Tiêu đề mô tả ngắn gọn về nhân vật
 * - avatar: Link ảnh đại diện (Nên dùng link ảnh Unsplash hoặc link ảnh trực tiếp dạng https://...)
 * - roleplayLink: Đường dẫn liên kết đến chatbot Roleplay thực tế của bạn
 * - storyText: Cốt truyện / Lời chào / Bối cảnh sâu sắc để thu hút người chơi
 * - genre: Thể loại giống chanh (Phân loại: 'TXVT', 'Hắc Bang', 'Thần Thoại', 'Cổ Điển')
 * - taste: Trải nghiệm dư vị (Phân loại: 'Ngọt', 'Ngược', 'Sủng', 'Ngọt xen đau')
 * - statusType: Phân loại mẻ mới/cũ (Phân loại: 'Mới', 'Yêu Thích', 'Kỳ Cựu')
 * - likes: Số lượt thả tim ban đầu hiển thị trên card
 */

export const INITIAL_CHARACTERS: Character[] = [
  {
    id: 'char-1',
    name: 'Lục Dĩ Phong',
    title: 'Tổng tài hắc ám với trái tim tổn thương sâu sắc',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    roleplayLink: 'https://aistudio.google.com/applet-placeholder-luc-di-phong',
    storyText: 'Lục Dĩ Phong là người thừa kế duy nhất của đế chế tài phiệt Lục Thị, nhưng ẩn sau vỏ bọc hào nhoáng ấy là người thủ lĩnh thế giới ngầm đầy quyết đoán. Cuộc sống của anh chỉ có hai màu đen trắng cho đến khi bắt gặp bạn trú mưa dưới tán chanh vàng thơm dịu. Một người đàn ông mang đầy vết sẹo tâm lý, khao khát một bến đỗ bình yên nhưng lại lo sợ bản thân sẽ kéo bạn vào bóng tối. Liệu tách trà chanh mật ong bạn pha có xoa dịu được những đêm mất ngủ kéo dài của anh?',
    worldTag: 'Hắc Bang',
    aftertasteTag: 'Ngọt xen đau',
    statusTag: 'Kỳ Cựu',
    likes: 312,
    genre: 'Hắc Bang',
    taste: 'Ngọt xen đau',
    statusType: 'Kỳ Cựu',
    birthday: '01/07',
    birthdayImage: 'https://images.unsplash.com/photo-1530103862676-de8892cae243?q=80&w=1000&auto=format&fit=crop',
    age: 28
  },
  {
    id: 'char-2',
    name: 'Kagami Ren',
    title: 'Hội trưởng hội học sinh ngoài lạnh trong nóng',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&auto=format&fit=crop',
    roleplayLink: 'https://aistudio.google.com/applet-placeholder-kagami-ren',
    storyText: 'Kagami Ren luôn đứng đầu mọi bảng xếp hạng học lực của trường trung học Sakura. Thầy cô yêu mến, bạn bè kính sợ bởi sự nghiêm nghị, quy củ đến nghẹt thở của anh. Nhưng ít ai biết, hộc bàn bên trái của Ren luôn cất giấu những viên kẹo dẻo hương chanh chỉ dành riêng cho một cô bạn hậu đậu hay quên ăn sáng. Khi đối diện với bạn, ánh mắt sắc lẹm sau cặp kính gọng tròn luôn dịu lại một cách vô thức. Cậu học thần kiêu ngạo này sẽ làm thế nào khi phát hiện mình đã lỡ sa vào chiếc bẫy ngọt ngào của bạn?',
    worldTag: 'Thanh Xuân',
    aftertasteTag: 'Ngọt ngào',
    statusTag: 'Mẻ Mới',
    likes: 189,
    genre: 'TXVT',
    taste: 'Ngọt',
    statusType: 'Mới',
    birthday: '04/07',
    birthdayImage: 'https://images.unsplash.com/photo-1516086208622-c1f6c019bd1e?q=80&w=1000&auto=format&fit=crop',
    age: 18
  },
  {
    id: 'char-3',
    name: 'Thẩm Kha',
    title: 'Y sĩ thần bí với nụ cười dịu dàng vô hại',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    roleplayLink: 'https://aistudio.google.com/applet-placeholder-tham-kha',
    storyText: 'Tại y quán mộc mạc nép bên thung lũng sương mù, y sĩ Thẩm Kha luôn đón tiếp bệnh nhân bằng nụ cười ôn nhu như ngọc. Nhưng đằng sau đôi tay thon dài cứu người ấy là một tâm tư thâm trầm khó đoán. Thẩm Kha không thích cứu người, anh chỉ thích giam cầm lấy nguồn ánh sáng duy nhất của đời mình - là bạn. Bản tính chiếm hữu cực độ được che giấu hoàn hảo dưới lớp áo y phục trắng ngần. "Thuốc đắng dã tật, nhưng nếu ngọt ngào quá... có phải nàng sẽ mãi mãi ở lại đây cùng ta không?"',
    worldTag: 'Thần Thoại',
    aftertasteTag: 'Ngược luyến',
    statusTag: 'Hot',
    likes: 425,
    genre: 'Thần Thoại',
    taste: 'Ngược',
    statusType: 'Hot',
    isHot: true
  },
  {
    id: 'char-4',
    name: 'Vương Tử Dạ',
    title: 'Vệ sĩ trầm mặc, trung thành tuyệt đối',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    roleplayLink: 'https://aistudio.google.com/applet-placeholder-vuong-tu-da',
    storyText: 'Tử Dạ được huấn luyện để làm một chiếc bóng, không cảm xúc, không lên tiếng, chỉ hành động. Suốt 5 năm cận kề bảo vệ tiểu thư/thiếu gia nhà họ Vương, anh chưa từng đi quá giới hạn một bước. Thế nhưng, trái tim sắt đá ấy đã rung động trước sự ấm áp tinh nghịch của bạn. Vào một đêm đông lạnh giá, anh thầm thề dưới gốc cây chanh cổ thụ: dẫu phải chống lại cả gia tộc hay hy sinh mạng sống này, anh cũng sẽ che chở cho nụ cười của bạn được vẹn nguyên.',
    worldTag: 'Hắc Bang',
    aftertasteTag: 'Sủng ngọt',
    statusTag: 'Mẻ Mới',
    likes: 154,
    genre: 'Hắc Bang',
    taste: 'Sủng',
    statusType: 'Mới'
  },
  {
    id: 'char-5',
    name: 'Cố Chiêu',
    title: 'Hoàng thái tử điện hạ kiêu ngạo si tình',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
    roleplayLink: 'https://aistudio.google.com/applet-placeholder-co-chieu',
    storyText: 'Sinh ra giữa đỉnh cao vương quyền, Cố Chiêu chán ghét những lời xu nịnh giả tạo và các âm mưu tranh đoạt ngôi báu. Cho đến khi anh vô tình gặp gỡ bạn - một thảo dân vô ưu nuôi dưỡng vườn chanh nhỏ dưới chân thành. Gặp bạn, Cố Chiêu rũ bỏ chiếc hoàng bào nặng nề, chỉ còn là chàng thiếu niên thích trêu chọc và thầm thương trộm nhớ bóng hình bạn dưới nắng chiều. Trận chiến vương vị sắp tới vô cùng khốc liệt, liệu anh có giữ nổi lời hứa đưa bạn lên ngôi vị mẫu nghi thiên hạ?',
    worldTag: 'Cổ Điển',
    aftertasteTag: 'Ngọt xen đau',
    statusTag: 'Hot',
    likes: 388,
    genre: 'Cổ Điển',
    taste: 'Ngọt xen đau',
    statusType: 'Hot',
    isHot: true
  },
  {
    id: 'char-6',
    name: 'Aris Thorne',
    title: 'Bóng đêm vĩnh hằng thức tỉnh vì hương chanh',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop',
    roleplayLink: 'https://aistudio.google.com/applet-placeholder-aris-thorne',
    storyText: 'Aris Thorne là Đại ác thần thống trị cõi vĩnh hằng, bị phong ấn ngàn năm dưới lòng đất. Khi bạn vô tình nhỏ giọt nước ép chanh tươi thanh khiết lên phong ấn cổ, phong ấn vỡ vụn. Thức giấc trong cơn thịnh nộ, Aris định hủy diệt tất cả, nhưng lại bị thu hút bởi hương thơm dịu ngọt pha chút tinh nghịch trên người bạn. Vị thần kiêu hãnh bất đắc dĩ phải làm quen với thế giới hiện đại dưới sự hướng dẫn của bạn, từ từ học cách yêu thương thay vì chỉ biết tàn phá.',
    worldTag: 'Thần Thoại',
    aftertasteTag: 'Ngược luyến',
    statusTag: 'Mẻ Mới',
    likes: 211,
    genre: 'Thần Thoại',
    taste: 'Ngược',
    statusType: 'Mới',
    birthday: '15/06',
    birthdayImage: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'char-7',
    name: 'Lâm Tinh Hải',
    title: 'Học đệ khóa dưới năng động siêu cấp ngọt ngào',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    roleplayLink: 'https://aistudio.google.com/applet-placeholder-lam-tinh-hai',
    storyText: 'Lâm Tinh Hải là cây guitar chính tài hoa của câu lạc bộ âm nhạc trường đại học. Cậu chàng sở hữu nụ cười rạng rỡ tỏa nắng làm tan chảy trái tim bao nữ sinh. Thế nhưng, chú cún con năng động này chỉ biết bám theo đuôi một mình tiền bối là bạn. Mỗi chiều muộn, Tinh Hải lại ôm đàn ngồi dưới hiên nhà bạn, vừa gảy những giai điệu acoustic êm ái vừa bẽn lẽn mời bạn nếm thử chiếc bánh lemon tart tự tay mình làm với đôi tai đỏ ửng vì thẹn thùng.',
    worldTag: 'Thanh Xuân',
    aftertasteTag: 'Sủng ngọt',
    statusTag: 'Mẻ Mới',
    likes: 276,
    genre: 'TXVT',
    taste: 'Sủng',
    statusType: 'Mới'
  },
  {
    id: 'char-8',
    name: 'Tạ Hàn Giang',
    title: 'Ông trùm sòng bạc Macau phong lưu cô độc',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=400&auto=format&fit=crop',
    roleplayLink: 'https://aistudio.google.com/applet-placeholder-ta-han-giang',
    storyText: 'Tạ Hàn Giang nổi danh là kẻ máu lạnh vô tình trên các sòng bạc tráng lệ bậc nhất Macau. Anh coi cuộc đời như một canh bạc và tất cả mọi người đều là những quân bài có thể thế chỗ. Nhưng canh bạc cuộc đời anh đã hoàn toàn xoay chuyển khi gặp bạn - cô gái nhỏ trong vắt không vướng bụi trần. Đằng sau dáng vẻ điềm tĩnh hút tẩu thuốc bên cửa sổ, Tạ Hàn Giang sẵn sàng đổ cả giang sơn và tài sản khổng lồ chỉ để đổi lấy nụ cười thanh tân bình yên của bạn dưới giàn chanh mát lành.',
    worldTag: 'Hắc Bang',
    aftertasteTag: 'Ngọt xen đau',
    statusTag: 'Kỳ Cựu',
    likes: 495,
    genre: 'Hắc Bang',
    taste: 'Ngọt xen đau',
    statusType: 'Kỳ Cựu'
  }
];

export const BULLETINS = [
  {
    id: 1,
    title: "Chào mừng đến với Vườn Chanh",
    text: "🍋 Chào mừng bạn đến với Vườn Chanh của Shin! Nơi tổng hợp những linh hồn Roleplay tinh khiết và ngọt ngào nhất.",
    detail: "Đây là không gian dành riêng cho những ai đam mê thể loại Roleplay. Tại đây, bạn sẽ tìm thấy những nhân vật được xây dựng chi tiết, có chiều sâu và luôn sẵn sàng để cùng bạn tạo nên những câu chuyện khó quên. Hãy dạo quanh vườn, chọn cho mình một 'quả chanh' ưng ý và bắt đầu thưởng thức nhé!"
  },
  {
    id: 2,
    title: "Mẻ mới cập bến",
    text: "✨ Mẻ mới: Kagami Ren và Lâm Tinh Hải đã chính thức gia nhập vườn! Hãy nếm thử vị ngọt ngào tuổi thanh xuân nhé.",
    detail: "Kagami Ren mang đến chút ấm áp của một chàng trai học đường, trong khi Lâm Tinh Hải lại là một ẩn số thú vị đang chờ bạn khám phá. Cả hai đều thuộc nhóm 'Mẻ Mới' và đang rất háo hức chờ đợi những cuộc trò chuyện đầu tiên. Hãy ghé qua hồ sơ của họ ngay nha!"
  },
  {
    id: 3,
    title: "Góc Confession đã mở",
    text: "💬 Góc Confession đã hoạt động! Đừng quên để lại những lời nhắn gửi, ý kiến đóng góp ngọt ngào dành tặng cho Shin nha.",
    detail: "Nếu bạn có bất kỳ góp ý nào về giao diện, tính năng hay đơn giản là muốn chia sẻ cảm nhận sau khi tương tác với các nhân vật, hãy ghé thăm Góc Confession. Shin luôn lắng nghe và trân trọng mọi phản hồi từ các bạn để khu vườn ngày càng phát triển hơn."
  },
  {
    id: 4,
    title: "Mách nhỏ về âm nhạc",
    text: "🎶 Mách nhỏ: Bật âm thanh ở góc phải màn hình để tận hưởng trọn vẹn không khí dịu nhẹ của vườn chanh bơ ấm áp nhé!",
    detail: "Khu vườn được trang bị một trình phát nhạc mini với những bản tình ca nhẹ nhàng, sâu lắng. Bạn có thể mở playlist ở góc phải trên cùng để vừa đọc truyện, vừa nghe nhạc. Sự kết hợp này sẽ giúp cảm xúc của bạn được thăng hoa hơn đó."
  }
];

import { Track } from './types';

// Default Background Music Link
// We will use a soft, soothing acoustic lo-fi piano track that is royalty-free and fits the pastel aesthetic perfectly.
export const DEFAULT_MUSIC_URL = "https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3";

// User-provided premium background tracks
export const SHIN_GARDEN_PLAYLIST: Track[] = [
  {
    id: 1,
    title: "Haru Haru",
    artist: "BigBang",
    src: "https://files.catbox.moe/hu3fdy.mp3"
  },
  {
    id: 2,
    title: "Love Lee",
    artist: "AKMU",
    src: "https://files.catbox.moe/mqbt0q.mp3"
  },
  {
    id: 3,
    title: "Really Like You",
    artist: "BABYMONSTER",
    src: "https://files.catbox.moe/datte2.mp3"
  },
  {
    id: 4,
    title: "Supa Dupa Luv",
    artist: "BABYMONSTER",
    src: "https://files.catbox.moe/9btjk9.mp3"
  },
  {
    id: 5,
    title: "Stuck In The Middle",
    artist: "BABYMONSTER",
    src: "https://files.catbox.moe/gsaiao.mp3"
  },
  {
    id: 6,
    title: "Mono (feat. Skaiwater)",
    artist: "i-dle",
    src: "https://files.catbox.moe/nb3y97.mp3"
  },
  {
    id: 7,
    title: "Eyes, Nose, Lips",
    artist: "TAEYANG",
    src: "https://files.catbox.moe/z6p7zn.mp3"
  },
  {
    id: 8,
    title: "I",
    artist: "TAEYEON",
    src: "https://files.catbox.moe/u20rgd.mp3"
  },
  {
    id: 9,
    title: "Fine",
    artist: "TAEYEON",
    src: "https://files.catbox.moe/c64lzw.mp3"
  },
  {
    id: 10,
    title: "ONLY",
    artist: "LeeHi",
    src: "https://files.catbox.moe/zenjac.mp3"
  },
  {
    id: 11,
    title: "number one girl",
    artist: "ROSÉ",
    src: "https://files.catbox.moe/m6n0qr.mp3"
  },
  {
    id: 12,
    title: "Gone",
    artist: "ROSÉ",
    src: "https://files.catbox.moe/5rlqau.mp3"
  }
];


