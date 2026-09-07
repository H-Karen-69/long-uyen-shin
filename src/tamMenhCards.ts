export interface TamMenhCard {
  id: 'sweet' | 'lonely' | 'peaceful' | 'melancholy' | 'fiery';
  name: string;
  emoji: string;
  color: string;
  quote: string;
  matchTaste: string[];
  description?: string;
}

/**
 * Danh sách 5 lá thẻ Tâm Mệnh cố định của Long Uyển
 */
export const TAM_MENH_CARDS: TamMenhCard[] = [
  {
    id: 'sweet',
    name: 'Ngọt Ngào',
    emoji: '🌸',
    color: '#E88BA0',
    quote: 'Hôm nay lòng em nở một đóa hồng — hãy để ai đó chạm vào thật nhẹ.',
    matchTaste: ['Ngọt', 'Sủng'],
    description: 'Tâm ý đong đầy mật ngọt, thích hợp tìm một tri kỷ sủng ái dịu dàng.',
  },
  {
    id: 'lonely',
    name: 'Cô Tịch',
    emoji: '🌙',
    color: '#7A8AA5',
    quote: 'Có những đêm Long Uyển cũng lặng thinh, chỉ còn tiếng vảy rồng chạm mây.',
    matchTaste: ['Yêu Thầm', 'Ngọt xen đau'],
    description: 'Khoảng lặng sâu lắng của tâm hồn, những vương vấn thầm kín chưa thốt thành lời.',
  },
  {
    id: 'peaceful',
    name: 'An Nhiên',
    emoji: '☁️',
    color: '#9AAAC5',
    quote: 'Gió qua vườn, hoa rơi khẽ — hôm nay chỉ cần một câu chuyện dịu dàng.',
    matchTaste: ['Ngọt', 'Slow Burn', 'Yêu Thầm'],
    description: 'Bình yên thanh thản, gác lại âu lo để đắm mình vào những xúc cảm lắng đọng.',
  },
  {
    id: 'melancholy',
    name: 'U Sầu',
    emoji: '🥀',
    color: '#5A6B85',
    quote: 'Nước mắt cũng là một loại nước tưới cho vườn — cứ khóc, rồi hoa sẽ nở.',
    matchTaste: ['Ngược', 'Ngọt xen đau'],
    description: 'Chút bi thương gột rửa tâm can, những câu chuyện đau đớn nhưng khó quên.',
  },
  {
    id: 'fiery',
    name: 'Nhiệt Huyết',
    emoji: '🔥',
    color: '#E88BA0',
    quote: 'Long Uyển đêm nay có lửa — kẻ nào dám bước vào cùng em?',
    matchTaste: ['NSFW', 'Ngược', 'Sủng'],
    description: 'Đam mê mãnh liệt, cuồng nhiệt và táo bạo như ngọn lửa bùng cháy.',
  },
];
