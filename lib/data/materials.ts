// Dữ liệu vật liệu kỹ thuật — tra cứu cơ tính, tương đương quốc tế, mẹo gia công.
// Số liệu là giá trị điển hình tham khảo (điều kiện thường hoá / ủ, trừ khi ghi chú "sau tôi").

export type MaterialGroup =
  | 'carbon-steel'
  | 'stainless'
  | 'tool-steel'
  | 'cast-iron'
  | 'alloy-steel'
  | 'aluminum'
  | 'copper';

export interface MaterialEquivalents {
  iso?: string;
  astm?: string;
  din?: string;
  gb?: string;
}

export interface Material {
  id: string;
  name: string;
  fullName: string;
  standard: string;
  group: MaterialGroup;
  /** Khối lượng riêng (g/cm3). */
  density: number;
  /** Độ bền kéo Rm (MPa). */
  tensileStrength: number;
  /** Giới hạn chảy Re / Rp0.2 (MPa). Gang xám không có giới hạn chảy rõ rệt: giá trị ước ~0,7×Rm. */
  yieldStrength: number;
  /** Độ cứng điển hình. */
  hardness: string;
  characteristics: string[];
  applications: string[];
  machiningTips: string[];
  equivalents: MaterialEquivalents;
  searchTags: string[];
}

export const MATERIAL_GROUPS: { id: MaterialGroup; label: string }[] = [
  { id: 'carbon-steel', label: 'Thép carbon' },
  { id: 'stainless', label: 'Inox' },
  { id: 'tool-steel', label: 'Thép dụng cụ' },
  { id: 'cast-iron', label: 'Gang' },
  { id: 'alloy-steel', label: 'Thép hợp kim' },
  { id: 'aluminum', label: 'Nhôm' },
  { id: 'copper', label: 'Đồng / Đồng thau' },
];

export const MATERIALS: Material[] = [
  {
    id: 's45c',
    name: 'S45C',
    fullName: 'Thép carbon trung bình S45C (~0,45% C)',
    standard: 'JIS G4051',
    group: 'carbon-steel',
    density: 7.85,
    tensileStrength: 570,
    yieldStrength: 345,
    hardness: '170–220 HB',
    characteristics: [
      'Cân bằng tốt giữa độ bền, độ cứng và khả năng gia công',
      'Tôi cải thiện (quench + temper) đạt 25–30 HRC, dùng được cho chi tiết chịu tải',
      'Hàn được nhưng cần nung nóng sơ bộ vì hàm lượng carbon trung bình',
    ],
    applications: [
      'Trục truyền động, then, bánh răng tải trung bình',
      'Khuôn gá, đồ gá, chi tiết máy sau tôi cải thiện',
    ],
    machiningTips: [
      'Tốc độ cắt tiện 120–180 m/ph với dao carbide khi ở trạng thái thường hoá',
      'Dùng dung dịch tưới nguội đầy đủ để tránh lẹo dao khi tiện tinh',
      'Giảm bước tiến khi phay vai sâu để hạn chế rung động',
    ],
    equivalents: { iso: 'C45E (ISO 683)', astm: 'AISI 1045', din: 'Ck45 / 1.1191', gb: '45#' },
    searchTags: ['s45c', 'thep 45', 'c45', '1045', 'thep carbon', 'thep ket cau'],
  },
  {
    id: 's50c',
    name: 'S50C',
    fullName: 'Thép carbon trung bình S50C (~0,50% C)',
    standard: 'JIS G4051',
    group: 'carbon-steel',
    density: 7.85,
    tensileStrength: 630,
    yieldStrength: 375,
    hardness: '180–235 HB',
    characteristics: [
      'Cứng và bền hơn S45C, độ dẻo thấp hơn một chút',
      'Đáp ứng tôi bề mặt (tôi cao tần) tốt, lớp bề mặt đạt 55 HRC',
      'Độ thấm tôi cao hơn thép carbon thấp',
    ],
    applications: [
      'Trục chịu mài mòn, chốt, vòng chặn',
      'Lưỡi cắt tải nhẹ, chi tiết cần tôi bề mặt',
    ],
    machiningTips: [
      'Chọn dao có góc cắt dương để giảm lực cắt khi tiện thô',
      'Tốc độ cắt thấp hơn S45C khoảng 10–15%',
      'Ủ mềm trước khi gia công nếu phôi cán nóng quá cứng',
    ],
    equivalents: { iso: 'C50E (ISO 683)', astm: 'AISI 1050', din: 'Ck50 / 1.1206', gb: '50#' },
    searchTags: ['s50c', 'c50', '1050', 'thep carbon', 'thep 50'],
  },
  {
    id: 's55c',
    name: 'S55C',
    fullName: 'Thép carbon trung bình-cao S55C (~0,55% C)',
    standard: 'JIS G4051',
    group: 'carbon-steel',
    density: 7.85,
    tensileStrength: 660,
    yieldStrength: 395,
    hardness: '190–240 HB',
    characteristics: [
      'Độ cứng và khả năng chống mài mòn cao trong nhóm thép carbon',
      'Độ dẻo và khả năng hàn thấp hơn S45C/S50C',
      'Thích hợp tôi toàn phần để làm dụng cụ tải vừa',
    ],
    applications: [
      'Dao cắt tải nhẹ, khuôn dập đơn giản',
      'Trục chịu mài mòn, con lăn',
    ],
    machiningTips: [
      'Ưu tiên dao carbide phủ khi tiện để tăng tuổi bền dao',
      'Tránh cắt gián đoạn mạnh vì phoi cứng dễ mẻ lưỡi',
      'Gia công tinh chừa lượng dư mài 0,2–0,3 mm trước khi tôi',
    ],
    equivalents: { iso: 'C55E (ISO 683)', astm: 'AISI 1055', din: 'Ck55 / 1.1203', gb: '55#' },
    searchTags: ['s55c', 'c55', '1055', 'thep carbon'],
  },
  {
    id: 'ss400',
    name: 'SS400',
    fullName: 'Thép kết cấu cán nóng SS400',
    standard: 'JIS G3101',
    group: 'carbon-steel',
    density: 7.85,
    tensileStrength: 440,
    yieldStrength: 245,
    hardness: '120–160 HB',
    characteristics: [
      'Mềm, dẻo, dễ gia công và dễ hàn nhất trong danh sách',
      'Giá rẻ, nguồn hàng phổ biến cho kết cấu và chi tiết phụ',
      'Không đáp ứng tôi để tăng cứng (carbon thấp)',
    ],
    applications: [
      'Khung máy, bệ máy, kết cấu hàn',
      'Chi tiết phụ, mặt bích, tấm lót không chịu tải lớn',
    ],
    machiningTips: [
      'Tốc độ cắt cao 150–250 m/ph với dao carbide vì vật liệu mềm',
      'Phoi dài dễ quấn dao: dùng chip-breaker và bước tiến lớn hơn 0,15 mm/vòng',
      'Kẹp chặt phôi mỏng để tránh cong vênh khi phay',
    ],
    equivalents: { iso: 'E275 (ISO 630)', astm: 'A36 / A283 Gr.C', din: 'S235JR / 1.0038', gb: 'Q235B' },
    searchTags: ['ss400', 'a36', 'q235', 'thep ket cau', 'thep tam', 'thep hinh'],
  },
  {
    id: 'ss490',
    name: 'SS490',
    fullName: 'Thép kết cấu cán nóng SS490',
    standard: 'JIS G3101',
    group: 'carbon-steel',
    density: 7.85,
    tensileStrength: 540,
    yieldStrength: 285,
    hardness: '140–180 HB',
    characteristics: [
      'Bền kéo cao hơn SS400 khoảng 20%, vẫn hàn tốt',
      'Dẻo dai đủ cho kết cấu chịu tải động vừa phải',
      'Nguồn phôi tấm, hình phổ biến',
    ],
    applications: [
      'Dầm, khung chịu tải nặng hơn SS400',
      'Chi tiết máy tải trung bình, tay biên',
    ],
    machiningTips: [
      'Thông số cắt tương tự SS400, giảm Vc khoảng 10% khi khoan sâu',
      'Vát mép trước khi hàn để ngấu sâu và ít biến dạng',
      'Dùng mũi khoan góc 135° cho lỗ sâu trên thép tấm dày',
    ],
    equivalents: { iso: 'E355 (ISO 630)', astm: 'A572 Gr.50', din: 'S355JR / 1.0045', gb: 'Q355B' },
    searchTags: ['ss490', 'thep ket cau', 'q355', 's355'],
  },
  {
    id: 'sm490',
    name: 'SM490',
    fullName: 'Thép kết cấu hàn SM490 (tấm dày, cầu đường)',
    standard: 'JIS G3106',
    group: 'carbon-steel',
    density: 7.85,
    tensileStrength: 540,
    yieldStrength: 325,
    hardness: '140–185 HB',
    characteristics: [
      'Giới hạn chảy cao (≥325 MPa với tấm mỏng), dẻo dai ở nhiệt độ thấp',
      'Chuyên dùng cho kết cấu hàn: cầu, cần cẩu, khung tải nặng',
      'Có các mác phụ A/B/C theo độ dai va đập',
    ],
    applications: [
      'Cầu thép, cần trục, khung máy nặng',
      'Bồn bể, kết cấu hàn chịu tải động',
    ],
    machiningTips: [
      'Gia công tương tự SS490; chú ý khử ứng suất sau hàn trước khi gia công tinh',
      'Khoan lỗ lắp bulong dùng dưỡng khoan để đảm bảo đồng tâm cụm lỗ',
      'Phay mặt bích lớn nên chia nhiều lát cắt nông để giảm cong vênh',
    ],
    equivalents: { iso: 'E355 (ISO 630)', astm: 'A572 Gr.50', din: 'S355J2 / 1.0577', gb: 'Q355D' },
    searchTags: ['sm490', 'thep cau duong', 'thep ket cau han', 'q355'],
  },
  {
    id: 'skd11',
    name: 'SKD11',
    fullName: 'Thép làm khuôn dập nguội SKD11 (12% Cr)',
    standard: 'JIS G4404',
    group: 'tool-steel',
    density: 7.7,
    tensileStrength: 1800,
    yieldStrength: 1500,
    hardness: '58–60 HRC (sau tôi)',
    characteristics: [
      'Chống mài mòn rất cao nhờ carbide crom, giữ kích thước tốt sau nhiệt luyện',
      'Độ thấm tôi sâu, thích hợp khuôn dập, khuôn đột kích thước lớn',
      'Khó gia công khi đã tôi: phải mài hoặc cắt dây EDM',
    ],
    applications: [
      'Khuôn dập nguội, chày cối đột, dao chấn',
      'Trục cán ren, dụng cụ đo cần chống mòn',
    ],
    machiningTips: [
      'Gia công thô khi còn ủ mềm (≤250 HB) rồi mới tôi chân không',
      'Sau tôi chỉ mài bằng đá CBN hoặc cắt dây, chừa dư mài 0,2–0,3 mm',
      'Ram 2 lần để ổn định kích thước trước khi mài tinh',
    ],
    equivalents: { astm: 'AISI D2', din: 'X155CrVMo12-1 / 1.2379', gb: 'Cr12MoV' },
    searchTags: ['skd11', 'd2', 'thep khuon', 'thep dap nguoi', 'cr12mov'],
  },
  {
    id: 'skd61',
    name: 'SKD61',
    fullName: 'Thép làm khuôn dập nóng / đúc áp lực SKD61',
    standard: 'JIS G4404',
    group: 'tool-steel',
    density: 7.8,
    tensileStrength: 1400,
    yieldStrength: 1200,
    hardness: '50–54 HRC (sau tôi)',
    characteristics: [
      'Chịu nhiệt, chịu sốc nhiệt và mỏi nhiệt tốt',
      'Dẻo dai nóng cao, ít nứt khi làm việc ở 400–600 °C',
      'Đánh bóng đạt độ bóng gương cho khuôn nhựa',
    ],
    applications: [
      'Khuôn đúc áp lực nhôm, khuôn rèn nóng',
      'Khuôn nhựa yêu cầu đánh bóng cao',
    ],
    machiningTips: [
      'Phay cao tốc với dao cầu khi còn mềm để đạt bề mặt tốt trước đánh bóng',
      'Nitơ hoá bề mặt sau tôi để tăng chống dính nhôm',
      'Tránh góc sắc trong thiết kế để hạn chế nứt mỏi nhiệt',
    ],
    equivalents: { astm: 'AISI H13', din: 'X40CrMoV5-1 / 1.2344', gb: '4Cr5MoSiV1' },
    searchTags: ['skd61', 'h13', 'thep khuon nong', 'khuon duc ap luc'],
  },
  {
    id: 'suj2',
    name: 'SUJ2',
    fullName: 'Thép ổ lăn SUJ2 (100Cr6)',
    standard: 'JIS G4805',
    group: 'alloy-steel',
    density: 7.83,
    tensileStrength: 1570,
    yieldStrength: 1370,
    hardness: '58–64 HRC (sau tôi)',
    characteristics: [
      'Độ cứng và giới hạn mỏi lăn rất cao sau tôi dầu',
      'Tổ chức sạch, ít tạp chất oxit cho tuổi thọ ổ lăn dài',
      'Chống gỉ kém, cần bôi trơn và bảo quản kỹ',
    ],
    applications: [
      'Bi, con lăn, vành ổ lăn',
      'Trục chính xác, vít me chịu tải lăn',
    ],
    machiningTips: [
      'Tiện bằng CBN hoặc mài sau khi tôi; chừa dư mài 0,2–0,4 mm',
      'Mài dùng đá mềm, tưới nguội mạnh để tránh cháy ram bề mặt',
      'Kiểm tra nứt bằng từ tính (MT) sau mài với chi tiết quan trọng',
    ],
    equivalents: { astm: 'AISI 52100', din: '100Cr6 / 1.3505', gb: 'GCr15' },
    searchTags: ['suj2', '52100', 'thep o lan', 'gcr15', 'thep vong bi'],
  },
  {
    id: 'sup9',
    name: 'SUP9',
    fullName: 'Thép lò xo SUP9 (Cr-Mn)',
    standard: 'JIS G4801',
    group: 'alloy-steel',
    density: 7.85,
    tensileStrength: 1225,
    yieldStrength: 1078,
    hardness: '300–400 HB (thép thanh giao hàng)',
    characteristics: [
      'Đàn hồi cao, giới hạn mỏi tốt sau tôi + ram trung bình',
      'Thích hợp nhíp, lò xo chịu tải va đập',
      'Cần khử cacbon bề mặt triệt để khi nhiệt luyện lò xo',
    ],
    applications: [
      'Nhíp ô tô, lò xo cuộn, lò xo lá',
      'Thanh xoắn, chi tiết đàn hồi',
    ],
    machiningTips: [
      'Gia công tạo hình trước khi tôi; sau tôi chỉ mài tinh',
      'Phun bi (shot peening) sau nhiệt luyện để tăng tuổi mỏi lò xo',
      'Tránh vết xước ngang thớ khi mài vì dễ khởi phát nứt mỏi',
    ],
    equivalents: { astm: 'AISI 5160', din: '55Cr3 / 1.7176', gb: '55CrMnA' },
    searchTags: ['sup9', '5160', 'thep lo xo', 'thep nhip'],
  },
  {
    id: 'sus304',
    name: 'SUS304',
    fullName: 'Inox austenitic SUS304 (18Cr-8Ni)',
    standard: 'JIS G4303',
    group: 'stainless',
    density: 7.93,
    tensileStrength: 520,
    yieldStrength: 205,
    hardness: '≤200 HB (ủ)',
    characteristics: [
      'Chống ăn mòn tốt trong môi trường thường, thực phẩm, hoá chất nhẹ',
      'Không nhiễm từ ở trạng thái ủ, dẻo và dễ hàn',
      'Bị hoá bền mạnh khi gia công nguội (biến cứng nhanh)',
    ],
    applications: [
      'Bồn bể thực phẩm, thiết bị y tế, lan can',
      'Chi tiết máy môi trường ẩm, ốc vít inox',
    ],
    machiningTips: [
      'Dùng dao sắc, góc thoát lớn, Vc 80–140 m/ph để hạn chế biến cứng bề mặt',
      'Không dừng dao giữa chừng khi tiện; duy trì bước tiến đều ≥0,1 mm/vòng',
      'Khoan dùng mũi hợp kim, tưới nguội áp lực cao, peck ngắn',
    ],
    equivalents: { iso: 'X5CrNi18-10', astm: 'AISI 304', din: 'X5CrNi18-10 / 1.4301', gb: '06Cr19Ni10' },
    searchTags: ['sus304', 'inox 304', '304', 'thep khong gi', '1.4301'],
  },
  {
    id: 'sus316',
    name: 'SUS316',
    fullName: 'Inox austenitic SUS316 (18Cr-10Ni-2Mo)',
    standard: 'JIS G4303',
    group: 'stainless',
    density: 7.98,
    tensileStrength: 520,
    yieldStrength: 205,
    hardness: '≤200 HB (ủ)',
    characteristics: [
      'Chống ăn mòn clorua, nước biển tốt hơn SUS304 nhờ 2% Mo',
      'Chịu nhiệt và chống rỗ (pitting) cao hơn',
      'Giá cao hơn 304, gia công khó hơn một chút',
    ],
    applications: [
      'Thiết bị biển, hoá chất, dược phẩm',
      'Van, bơm, trục tiếp xúc nước muối',
    ],
    machiningTips: [
      'Vc thấp hơn 304 khoảng 10–20%, ưu tiên dao phủ chống dính',
      'Tưới nguội dồi dào; tránh cắt khô gây dính lưỡi và xấu bề mặt',
      'Taro dùng taro rãnh xoắn + dầu cắt chuyên inox',
    ],
    equivalents: { astm: 'AISI 316', din: 'X5CrNiMo17-12-2 / 1.4401', gb: '06Cr17Ni12Mo2' },
    searchTags: ['sus316', 'inox 316', '316', 'inox bien', '1.4401'],
  },
  {
    id: 'sus316l',
    name: 'SUS316L',
    fullName: 'Inox siêu thấp carbon SUS316L',
    standard: 'JIS G4303',
    group: 'stainless',
    density: 7.98,
    tensileStrength: 480,
    yieldStrength: 170,
    hardness: '≤200 HB (ủ)',
    characteristics: [
      'Carbon ≤0,03% nên chống ăn mòn kẽ hở mối hàn rất tốt',
      'Mềm và dẻo hơn 316 thường, dễ tạo hình',
      'Chuẩn phổ biến cho y tế, dược phẩm, thực phẩm cần hàn nhiều',
    ],
    applications: [
      'Đường ống dược phẩm, bồn chứa hoá chất',
      'Cấy ghép y tế, chi tiết hàn yêu cầu cao',
    ],
    machiningTips: [
      'Vật liệu dẻo dính: dùng dao bóng, bước tiến ổn định để cắt đứt phoi',
      'Hàn TIG không cần xử lý nhiệt sau hàn với tấm mỏng',
      'Mài dùng nhám chuyên inox để tránh nhiễm bẩn sắt thường',
    ],
    equivalents: { astm: 'AISI 316L', din: 'X2CrNiMo17-12-2 / 1.4404', gb: '022Cr17Ni12Mo2' },
    searchTags: ['sus316l', 'inox 316l', '316l', 'inox y te', '1.4404'],
  },
  {
    id: 'sus430',
    name: 'SUS430',
    fullName: 'Inox ferritic SUS430 (17Cr)',
    standard: 'JIS G4303',
    group: 'stainless',
    density: 7.75,
    tensileStrength: 450,
    yieldStrength: 205,
    hardness: '≤183 HB (ủ)',
    characteristics: [
      'Nhiễm từ, giãn nở nhiệt thấp, giá rẻ hơn nhóm austenitic',
      'Chống oxy hoá ở nhiệt độ cao tốt, chống ăn mòn vừa phải',
      'Khó hàn hơn 304, mối hàn dễ giòn nếu không đúng quy trình',
    ],
    applications: [
      'Tấm ốp, thiết bị bếp, ống xả',
      'Chi tiết trang trí nội thất cần chống gỉ nhẹ',
    ],
    machiningTips: [
      'Gia công dễ hơn 304: có thể nâng Vc cao hơn 15–20%',
      'Uốn tấm chú ý bán kính uốn lớn hơn inox austenitic',
      'Hàn dùng que chuyên ferritic và kiểm soát nhiệt đầu vào thấp',
    ],
    equivalents: { astm: 'AISI 430', din: 'X6Cr17 / 1.4016', gb: '10Cr17' },
    searchTags: ['sus430', 'inox 430', '430', 'inox nhiem tu', '1.4016'],
  },
  {
    id: 'sus420j2',
    name: 'SUS420J2',
    fullName: 'Inox martensitic SUS420J2 (13Cr, tôi cứng được)',
    standard: 'JIS G4303',
    group: 'stainless',
    density: 7.75,
    tensileStrength: 650,
    yieldStrength: 440,
    hardness: '≤235 HB (ủ) / 50–56 HRC (sau tôi)',
    characteristics: [
      'Tôi cứng được như thép dụng cụ nhưng vẫn chống gỉ',
      'Giữ lưỡi sắc tốt cho dao, khuôn cần chống mòn vừa',
      'Chống ăn mòn kém hơn 304, không dùng môi trường clorua nặng',
    ],
    applications: [
      'Lưỡi dao công nghiệp, dao mổ, kéo',
      'Van, trục bơm cần cứng và chống gỉ',
    ],
    machiningTips: [
      'Gia công thô khi ủ mềm rồi tôi, mài tinh sau tôi',
      'Mài cẩn thận tránh nứt nhiệt vì vật liệu giòn sau tôi',
      'Đánh bóng sau nhiệt luyện để phát huy khả năng chống gỉ',
    ],
    equivalents: { astm: 'AISI 420', din: 'X30Cr13 / 1.4028', gb: '30Cr13' },
    searchTags: ['sus420j2', 'sus420', 'inox 420', 'inox toi cung', 'dao'],
  },
  {
    id: 'scm440',
    name: 'SCM440',
    fullName: 'Thép hợp kim Cr-Mo SCM440 (42CrMo)',
    standard: 'JIS G4053',
    group: 'alloy-steel',
    density: 7.85,
    tensileStrength: 980,
    yieldStrength: 835,
    hardness: '270–320 HB (tôi cải thiện)',
    characteristics: [
      'Độ bền và độ dai cao sau tôi cải thiện, chịu tải động tốt',
      'Thấm tôi sâu, dùng được cho tiết diện lớn',
      '"Thép vạn năng" cho trục, bánh răng tải nặng',
    ],
    applications: [
      'Trục chính, bánh răng, bulong cường độ cao 10.9',
      'Thanh truyền, trục khuỷu tải nặng',
    ],
    machiningTips: [
      'Gia công thô trước tôi cải thiện, để dư 0,5–1 mm rồi tiện tinh sau',
      'Vc 90–140 m/ph với carbide khi ở 28–32 HRC',
      'Khoan lỗ sâu dùng chu trình peck và tưới nguội trong (through-coolant)',
    ],
    equivalents: { astm: 'AISI 4140', din: '42CrMo4 / 1.7225', gb: '42CrMo' },
    searchTags: ['scm440', '4140', '42crmo', 'thep hop kim', 'thep truc'],
  },
  {
    id: 'scm415',
    name: 'SCM415',
    fullName: 'Thép thấm carbon SCM415 (Cr-Mo thấp)',
    standard: 'JIS G4053',
    group: 'alloy-steel',
    density: 7.85,
    tensileStrength: 850,
    yieldStrength: 650,
    hardness: '150–200 HB (thường hoá)',
    characteristics: [
      'Chuyên thấm carbon: bề mặt cứng 58–62 HRC, lõi vẫn dẻo dai',
      'Ít cong vênh sau thấm tôi hơn thép carbon thường',
      'Chuẩn cho bánh răng, trục then hoa cần chống mỏi tiếp xúc',
    ],
    applications: [
      'Bánh răng hộp số, trục then hoa',
      'Chốt piston, bạc chịu tải lăn',
    ],
    machiningTips: [
      'Gia công tinh đạt Ra ≤1,6 trước thấm để lớp thấm đều và ít biến dạng',
      'Che chắn ren và mặt không cần cứng bằng sơn chống thấm',
      'Mài sau nhiệt luyện để đạt dung sai bánh răng cấp chính xác',
    ],
    equivalents: { astm: 'AISI 4115', din: '15CrMo5', gb: '15CrMo' },
    searchTags: ['scm415', 'thep tham carbon', 'thep banh rang', '15crmo'],
  },
  {
    id: 'sncm439',
    name: 'SNCM439',
    fullName: 'Thép hợp kim Ni-Cr-Mo SNCM439 (tải rất nặng)',
    standard: 'JIS G4053',
    group: 'alloy-steel',
    density: 7.85,
    tensileStrength: 1080,
    yieldStrength: 900,
    hardness: '300–350 HB (tôi cải thiện)',
    characteristics: [
      'Độ bền và độ dai cao nhất nhóm thép chế tạo máy nhờ niken',
      'Chịu mỏi uốn-xoắn và va đập rất tốt',
      'Giá cao, thường chỉ dùng cho chi tiết then chốt',
    ],
    applications: [
      'Trục tuabin, trục chân vịt, bulong siêu trường',
      'Bánh răng tải shock, trục khuỷu cao tốc',
    ],
    machiningTips: [
      'Gia công ở trạng thái tôi cải thiện 30–36 HRC với dao phủ chịu nhiệt',
      'Giảm chiều sâu cắt khi tiện để tránh quá tải dao vì vật liệu dai',
      'Siêu âm hoặc MT kiểm tra khuyết tật với trục quan trọng',
    ],
    equivalents: { astm: 'AISI 4340', din: '36CrNiMo4 / 1.6511', gb: '40CrNiMoA' },
    searchTags: ['sncm439', '4340', 'thep niken', 'thep tai nang'],
  },
  {
    id: 'sk3',
    name: 'SK3',
    fullName: 'Thép dụng cụ carbon SK3 (~1,0% C)',
    standard: 'JIS G4401',
    group: 'tool-steel',
    density: 7.85,
    tensileStrength: 800,
    yieldStrength: 450,
    hardness: '60–63 HRC (sau tôi)',
    characteristics: [
      'Độ cứng sau tôi rất cao, giữ lưỡi sắc tốt',
      'Rẻ hơn thép hợp kim dụng cụ nhưng chịu nhiệt kém (ram thấp)',
      'Dễ biến dạng và nứt khi tôi nếu tiết diện thay đổi đột ngột',
    ],
    applications: [
      'Dũa, lưỡi dao gỗ, mũi đột nhỏ',
      'Dụng cụ đo, dưỡng kiểm đơn giản',
    ],
    machiningTips: [
      'Gia công hoàn thiện khi ủ mềm, tôi nước muối đúng nhiệt độ 760–820 °C',
      'Ram ngay sau tôi để tránh nứt, không để qua đêm',
      'Mài ướt nhẹ nhàng, tránh cháy bề mặt làm mềm lưỡi',
    ],
    equivalents: { astm: 'W108 (W1)', din: 'C105W1 / 1.1545', gb: 'T10A' },
    searchTags: ['sk3', 'thep gio', 'thep dung cu carbon', 't10a', 'w1'],
  },
  {
    id: 'sk5',
    name: 'SK5',
    fullName: 'Thép dụng cụ carbon SK5 (~0,85% C)',
    standard: 'JIS G4401',
    group: 'tool-steel',
    density: 7.85,
    tensileStrength: 850,
    yieldStrength: 500,
    hardness: '58–62 HRC (sau tôi)',
    characteristics: [
      'Cân bằng giữa độ cứng và độ dai trong nhóm thép gió carbon',
      'Phổ biến làm lưỡi cưa, lò xo lá mỏng, dao rọc',
      'Dễ cán mỏng và dập tạo hình khi ủ mềm',
    ],
    applications: [
      'Lưỡi cưa, lưỡi dao rọc, thước lá',
      'Lò xo phẳng, chi tiết đàn hồi mỏng',
    ],
    machiningTips: [
      'Cắt tấm mỏng dùng laser hoặc dập để tránh biến cứng mép',
      'Tôi trong lò muối để biến dạng ít nhất',
      'Đánh bavia kỹ trước tôi vì vết xước gây nứt khi dùng',
    ],
    equivalents: { astm: 'W1-8 (W1)', din: 'C85W / 1.1746', gb: 'T8A' },
    searchTags: ['sk5', 'thep luoi cua', 'thep dung cu carbon', 't8a'],
  },
  {
    id: 'fc150',
    name: 'FC150',
    fullName: 'Gang xám FC150 (bền kéo ≥150 MPa)',
    standard: 'JIS G5501',
    group: 'cast-iron',
    density: 7.2,
    tensileStrength: 150,
    yieldStrength: 105,
    hardness: '150–200 HB',
    characteristics: [
      'Giảm chấn tốt, chịu nén tốt, giá rẻ cho thân máy',
      'Không có giới hạn chảy rõ rệt, giòn khi chịu kéo/uốn',
      'Graphite tấm giúp cắt gọt dễ, phoi vụn',
    ],
    applications: [
      'Thân máy nhỏ, hộp số, puly',
      'Đế máy, bàn máy yêu cầu giảm rung',
    ],
    machiningTips: [
      'Tiện khô được nhưng hút bụi gang để bảo vệ ray máy',
      'Dùng dao carbide grade gang (K), Vc 80–150 m/ph',
      'Khoan lỗ ren nên khoan lớn hơn 0,05–0,1 mm vì ren gang dễ vỡ đỉnh',
    ],
    equivalents: { iso: 'EN-GJL-150', astm: 'A48 Class 25', din: 'GG15 / EN-GJL-150', gb: 'HT150' },
    searchTags: ['fc150', 'gang xam', 'ht150', 'gang duc', 'gg15'],
  },
  {
    id: 'fc200',
    name: 'FC200',
    fullName: 'Gang xám FC200 (bền kéo ≥200 MPa)',
    standard: 'JIS G5501',
    group: 'cast-iron',
    density: 7.2,
    tensileStrength: 200,
    yieldStrength: 140,
    hardness: '170–230 HB',
    characteristics: [
      'Cấp gang xám thông dụng nhất cho thân máy công cụ',
      'Độ cứng và độ bền cao hơn FC150, vẫn gia công tốt',
      'Ổn định kích thước sau xử lý khử ứng suất',
    ],
    applications: [
      'Thân máy tiện, máy phay, hộp giảm tốc',
      'Bánh đà, tang trống, vỏ bơm',
    ],
    machiningTips: [
      'Phay mặt lớn nên dùng dao phay mặt gắn mảnh chuyên gang',
      'Chừa dư gia công 2–3 mm cho phôi đúc vỏ mỏng',
      'Doa lỗ ổ bi đạt Ra 0,8 trước khi lắp vòng bi',
    ],
    equivalents: { iso: 'EN-GJL-200', astm: 'A48 Class 30', din: 'GG20 / EN-GJL-200', gb: 'HT200' },
    searchTags: ['fc200', 'gang xam', 'ht200', 'than may', 'gg20'],
  },
  {
    id: 'fc250',
    name: 'FC250',
    fullName: 'Gang xám FC250 (bền kéo ≥250 MPa)',
    standard: 'JIS G5501',
    group: 'cast-iron',
    density: 7.25,
    tensileStrength: 250,
    yieldStrength: 175,
    hardness: '180–250 HB',
    characteristics: [
      'Cấp gang xám bền cao, chịu tải và chịu mài mòn tốt',
      'Vẫn giữ khả năng giảm chấn đặc trưng của gang',
      'Yêu cầu đúc và kiểm tra khuyết tật chặt chẽ hơn',
    ],
    applications: [
      'Băng máy, sống trượt máy công cụ',
      'Xylanh, sơ mi, chi tiết chịu mài mòn trượt',
    ],
    machiningTips: [
      'Giảm Vc 10–20% so với FC200 vì độ cứng cao hơn',
      'Mài sống trượt đạt phẳng và nhám thấp để giữ dầu bôi trơn',
      'Cạo rà (scraping) mặt trượt để tạo túi dầu',
    ],
    equivalents: { iso: 'EN-GJL-250', astm: 'A48 Class 35', din: 'GG25 / EN-GJL-250', gb: 'HT250' },
    searchTags: ['fc250', 'gang xam', 'ht250', 'song truot', 'gg25'],
  },
  {
    id: 'fcd450',
    name: 'FCD450',
    fullName: 'Gang cầu FCD450 (bền kéo ≥450 MPa, dẻo)',
    standard: 'JIS G5502',
    group: 'cast-iron',
    density: 7.25,
    tensileStrength: 450,
    yieldStrength: 280,
    hardness: '140–210 HB',
    characteristics: [
      'Graphite cầu nên dẻo dai, có giới hạn chảy rõ rệt như thép',
      'Bền kéo gấp 2–3 lần gang xám cùng độ cứng',
      'Thay thế thép đúc cho nhiều chi tiết phức tạp',
    ],
    applications: [
      'Trục khuỷu, moay ơ, càng, gối đỡ',
      'Van áp lực, vỏ hộp số chịu tải',
    ],
    machiningTips: [
      'Gia công tương tự thép carbon thấp với Vc 100–180 m/ph',
      'Phoi dây dài hơn gang xám: cần bẻ phoi tốt',
      'Taro ren đạt chất lượng cao hơn gang xám nhiều',
    ],
    equivalents: { astm: 'A536 65-45-12', din: 'GGG45 / EN-GJS-450-10', gb: 'QT450-10' },
    searchTags: ['fcd450', 'gang cau', 'gang deo', 'qt450', 'ductile iron'],
  },
  {
    id: 'fcd500',
    name: 'FCD500',
    fullName: 'Gang cầu FCD500 (bền kéo ≥500 MPa)',
    standard: 'JIS G5502',
    group: 'cast-iron',
    density: 7.25,
    tensileStrength: 500,
    yieldStrength: 320,
    hardness: '160–230 HB',
    characteristics: [
      'Bền và cứng hơn FCD450, độ giãn dài ≥7%',
      'Chịu mỏi và chịu va đập tốt cho chi tiết an toàn',
      'Đúc được hình phức tạp mà rèn khó làm',
    ],
    applications: [
      'Chi tiết treo ô tô, càng phanh',
      'Bánh răng tải vừa, khớp nối',
    ],
    machiningTips: [
      'Dùng thông số như thép C45 khi tiện tinh',
      'Kiểm tra rỗ khí bằng siêu âm với chi tiết chịu áp',
      'Nhiệt luyện đẳng nhiệt (ADI) nếu cần bền trên 800 MPa',
    ],
    equivalents: { astm: 'A536 80-55-06', din: 'GGG50 / EN-GJS-500-7', gb: 'QT500-7' },
    searchTags: ['fcd500', 'gang cau', 'qt500', 'ductile iron'],
  },
  {
    id: 'adc12',
    name: 'ADC12',
    fullName: 'Hợp kim nhôm đúc áp lực ADC12 (Al-Si-Cu)',
    standard: 'JIS H5302',
    group: 'aluminum',
    density: 2.75,
    tensileStrength: 310,
    yieldStrength: 150,
    hardness: '75–95 HB',
    characteristics: [
      'Đúc áp lực chi tiết mỏng, phức tạp với độ chảy khuôn cao',
      'Chống ăn mòn khí quyển khá, nhẹ hơn thép 2,8 lần',
      'Cơ tính trung bình, không biến dạng dẻo nhiều được',
    ],
    applications: [
      'Vỏ hộp số, vỏ động cơ, nắp máy',
      'Chi tiết xe máy, linh kiện điện tử',
    ],
    machiningTips: [
      'Dao PCD hoặc carbide bóng, Vc 300–800 m/ph cho bề mặt đẹp',
      'Tránh nhiệt cao gây rỗ khí đúc lộ ra khi cắt sâu',
      'Taro dùng taro chuyên nhôm + dầu cắt để không kẹt phoi',
    ],
    equivalents: { astm: 'A383', din: 'AlSi11Cu3', gb: 'YL113' },
    searchTags: ['adc12', 'nhom duc', 'nhom ap luc', 'a383', 'hop kim nhom'],
  },
  {
    id: 'a2024',
    name: 'A2024',
    fullName: 'Nhôm hoá bền A2024-T3/T4 (Al-Cu, duralumin)',
    standard: 'JIS H4000',
    group: 'aluminum',
    density: 2.78,
    tensileStrength: 470,
    yieldStrength: 325,
    hardness: '120 HB',
    characteristics: [
      'Bền kéo cao nhất nhóm nhôm biến dạng, sánh ngang thép mềm',
      'Chống ăn mòn kém hơn 6061, cần anot hoá hoặc sơn phủ',
      'Mỏi tốt, chuẩn cho kết cấu hàng không',
    ],
    applications: [
      'Khung máy bay, tấm vỏ chịu lực',
      'Chi tiết máy cần nhẹ và bền cao',
    ],
    machiningTips: [
      'Cắt rất ngọt: Vc 400–1000 m/ph, dao 2–3 me chuyên nhôm',
      'Kẹp nhẹ tay, dùng đe đỡ vì phôi mỏng dễ biến dạng',
      'Phay rãnh sâu chia nhiều lát và thổi khí để thoát phoi',
    ],
    equivalents: { astm: 'AA 2024-T3', din: 'AlCu4Mg1 / 3.1325', gb: '2A12' },
    searchTags: ['a2024', '2024', 'nhom hang khong', 'duralumin', '2a12'],
  },
  {
    id: 'a6061',
    name: 'A6061',
    fullName: 'Nhôm hợp kim A6061-T6 (Al-Mg-Si)',
    standard: 'JIS H4000',
    group: 'aluminum',
    density: 2.7,
    tensileStrength: 310,
    yieldStrength: 276,
    hardness: '95 HB',
    characteristics: [
      'Cân bằng nhất: bền khá, chống ăn mòn tốt, hàn và anot hoá đẹp',
      'Phổ biến nhất cho chi tiết máy nhôm, tấm, thanh định hình',
      'Giá hợp lý, nguồn hàng đa dạng',
    ],
    applications: [
      'Khung máy, mặt bích, đồ gá nhẹ',
      'Chi tiết CNC nhôm, tản nhiệt',
    ],
    machiningTips: [
      'Thông số chuẩn phay nhôm: Vc 500–900 m/ph, fz 0,05–0,15 mm/răng',
      'Dùng dầu cắt hoặc khí + sương dầu để bề mặt bóng',
      'Hàn TIG que 4043/5356, không cần nung nóng sơ bộ',
    ],
    equivalents: { astm: 'AA 6061-T6', din: 'AlMg1SiCu / 3.3214', gb: '6061' },
    searchTags: ['a6061', '6061', 'nhom 6061', 'nhom dinh hinh', 'nhom cnc'],
  },
  {
    id: 'c1100',
    name: 'C1100',
    fullName: 'Đồng đỏ C1100 (Cu ≥99,9%, ETP)',
    standard: 'JIS H3100',
    group: 'copper',
    density: 8.89,
    tensileStrength: 220,
    yieldStrength: 70,
    hardness: '45–100 HV (tuỳ độ cứng)',
    characteristics: [
      'Dẫn điện, dẫn nhiệt cao nhất trong danh sách vật liệu',
      'Rất dẻo, dễ uốn, dập vuốt sâu và hàn đồng',
      'Mềm nên dễ dính dao, khó đạt nhám thấp khi tiện',
    ],
    applications: [
      'Thanh cái điện, đầu cos, tiếp điểm',
      'Ống dẫn nhiệt, tấm tản nhiệt, chi tiết dẫn điện',
    ],
    machiningTips: [
      'Dao thật sắc, góc thoát lớn ≥15°, Vc 150–300 m/ph',
      'Bước tiến không quá nhỏ để tránh dao "ủi" thay vì cắt',
      'Dùng dầu cắt lưu huỳnh thấp để không ố bề mặt đồng',
    ],
    equivalents: { astm: 'C11000 (ETP)', din: 'Cu-ETP / 2.0065', gb: 'T2' },
    searchTags: ['c1100', 'dong do', 'dong dien', 'c11000', 'cu-etp'],
  },
  {
    id: 'c3602',
    name: 'C3602',
    fullName: 'Đồng thau cắt gọt C3602 (CuZn39Pb3)',
    standard: 'JIS H3250',
    group: 'copper',
    density: 8.5,
    tensileStrength: 380,
    yieldStrength: 150,
    hardness: '100–140 HV',
    characteristics: [
      'Chì (~3%) giúp cắt gọt cực tốt, phoi vụn, bề mặt bóng',
      'Chống ăn mòn nước thường tốt, dễ mạ trang trí',
      'Không nên hàn và không dùng nhiệt độ cao lâu dài',
    ],
    applications: [
      'Đầu nối, van, phụ kiện ống nước',
      'Bánh răng nhỏ, chi tiết tiện tự động số lượng lớn',
    ],
    machiningTips: [
      'Tiện tự động năng suất cao: Vc 150–350 m/ph, cắt khô vẫn đẹp',
      'Mũi khoan góc 130°, thoát phoi tốt vì phoi vụn',
      'Taro ren mịn đạt chất lượng cao, ít kẹt taro',
    ],
    equivalents: { astm: 'C36000', din: 'CuZn39Pb3 / 2.0401', gb: 'HPb59-1' },
    searchTags: ['c3602', 'dong thau', 'brass', 'c36000', 'dong tien'],
  },
];

/** Tra cứu vật liệu theo id (không phân biệt hoa thường). */
export function getMaterialById(id: string): Material | undefined {
  const key = id.trim().toLowerCase();
  return MATERIALS.find((m) => m.id === key || m.name.toLowerCase() === key);
}

/** Tìm kiếm vật liệu theo tên, mác tương đương, ứng dụng, tag. */
export function searchMaterials(q: string): Material[] {
  const query = q.trim().toLowerCase();
  if (query === '') return MATERIALS;
  return MATERIALS.filter((m) => {
    const haystack = [
      m.id,
      m.name,
      m.fullName,
      m.standard,
      ...m.searchTags,
      ...m.applications,
      m.equivalents.iso ?? '',
      m.equivalents.astm ?? '',
      m.equivalents.din ?? '',
      m.equivalents.gb ?? '',
    ]
      .join(' ')
      .toLowerCase();
    return query
      .split(/\s+/)
      .every((token) => token !== '' && haystack.includes(token));
  });
}
