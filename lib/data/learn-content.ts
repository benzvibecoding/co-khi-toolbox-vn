// Bài viết học liệu cơ khí: giải thích khái niệm + ví dụ số + gợi ý công cụ thực hành.

export interface LearnPost {
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  relatedToolId?: string;
  relatedToolHref?: string;
  /** Các đoạn văn của bài viết; đoạn cuối gợi ý công cụ thực hành. */
  content: string[];
}

export const LEARN_POSTS: LearnPost[] = [
  {
    slug: 'rpm-la-gi',
    title: 'RPM là gì? Cách tính vòng quay trục chính',
    tag: 'Cắt gọt',
    excerpt:
      'RPM là số vòng quay mỗi phút của trục chính. Hiểu công thức n = (1000 × Vc) / (π × D) giúp bạn đặt đúng tốc độ máy cho mọi đường kính dao và vật liệu.',
    relatedToolId: 'rpm',
    relatedToolHref: '/rpm',
    content: [
      'RPM (revolutions per minute) là số vòng mà trục chính máy công cụ quay được trong một phút. Đây là thông số bạn nhập trực tiếp lên máy tiện, máy phay, máy khoan. Nhưng RPM không đứng một mình: cùng một tốc độ cắt Vc, dao càng to thì RPM càng thấp, dao càng nhỏ thì RPM càng cao. Vì vậy thợ giỏi không "nhớ RPM" mà nhớ tốc độ cắt Vc của từng vật liệu, rồi quy đổi ra RPM theo đường kính dao đang dùng.',
      'Công thức quy đổi là n = (1000 × Vc) / (π × D), trong đó Vc tính bằng m/ph và D tính bằng mm. Ví dụ tiện thép S45C với Vc = 150 m/ph, phôi đường kính 50 mm: n = (1000 × 150) / (3,1416 × 50) ≈ 955 vòng/ph, bạn chọn nấc máy gần nhất là 950. Còn khi phay nhôm bằng dao Ø10 với Vc = 300 m/ph: n = (1000 × 300) / (3,1416 × 10) ≈ 9550 vòng/ph, lúc này cần máy phay tốc độ cao mới đáp ứng được.',
      'Sai lầm phổ biến là để RPM quá cao khi dùng dao lớn, khiến lưỡi cắt quá nhiệt và mòn chỉ sau vài phút; hoặc RPM quá thấp khi dùng dao nhỏ, khiến dao "ủi" vật liệu thay vì cắt, bề mặt xấu và dao dễ gãy vì kẹt phoi. Một mẹo thực tế: khi nghe tiếng cắt rít bất thường hoặc thấy phoi đổi màu xanh (với thép), hãy giảm RPM 10–20% trước khi nghi ngờ các thông số khác. Ngược lại, nếu phoi ra dạng bột vụn và năng suất thấp, có thể tăng RPM trong giới hạn Vc cho phép.',
      'Để không phải bấm máy tính mỗi lần đổi dao, hãy dùng công cụ tính RPM của Cơ Khí Toolbox VN: nhập tốc độ cắt Vc và đường kính D, công cụ trả ngay vòng quay trục chính và gợi ý nấc máy gần nhất. Thử ngay với ví dụ 150 m/ph và phôi Ø50 ở trên để kiểm chứng kết quả 955 vòng/ph.',
    ],
  },
  {
    slug: 'toc-do-cat-la-gi',
    title: 'Tốc độ cắt (Vc) là gì? Bảng tra và cách chọn',
    tag: 'Cắt gọt',
    excerpt:
      'Vc là quãng đường lưỡi cắt đi qua bề mặt phôi trong một phút. Chọn đúng Vc giúp dao bền, bề mặt đẹp và năng suất cao.',
    relatedToolId: 'toc-do-cat',
    relatedToolHref: '/toc-do-cat',
    content: [
      'Tốc độ cắt Vc (cutting speed) đo bằng m/ph, là vận tốc tương đối giữa lưỡi cắt và bề mặt phôi tại điểm cắt. Công thức Vc = (π × D × n) / 1000 cho thấy Vc phụ thuộc đường kính và RPM. Ý nghĩa thực tế: Vc quyết định nhiệt độ vùng cắt. Mỗi cặp vật liệu phôi – vật liệu dao chỉ "chịu" được một khoảng Vc nhất định; vượt quá, dao mòn nhiệt rất nhanh; thấp quá thì năng suất kém và dễ tạo lẹo dao.',
      'Giá trị tham khảo với dao carbide: thép carbon (S45C) khoảng 120–200 m/ph, inox 304 khoảng 80–140 m/ph, gang xám 80–150 m/ph, nhôm 300–800 m/ph, đồng thau 150–350 m/ph. Ví dụ dao phay Ø20 quay 1500 vòng/ph cho Vc = (3,1416 × 20 × 1500) / 1000 ≈ 94 m/ph — hợp lý cho inox nhưng hơi thấp cho thép thường, lúc đó có thể tăng lên 2000 vòng/ph để đạt khoảng 126 m/ph. Luôn tra bảng của hãng dao vì lớp phủ (TiN, AlTiN...) cho phép nâng Vc 20–50%.',
      'Tốc độ cắt còn liên quan mật thiết đến tuổi bền dao theo quy luật Taylor: tăng Vc 20% có thể làm tuổi dao giảm một nửa. Vì vậy khi gia công hàng loạt, người ta thường chọn Vc ở "điểm kinh tế" — hơi thấp hơn Vc tối đa — để tổng chi phí dao + thời gian là nhỏ nhất. Với chi tiết đơn chiếc cần nhanh, có thể đẩy Vc cao hơn và chấp nhận thay dao sớm. Ngoài ra, cắt khô, tưới nguội hay khí nén cũng làm thay đổi Vc chọn được 10–30%.',
      'Thay vì tra bảng giấy, bạn có thể dùng công cụ tính tốc độ cắt: nhập đường kính và RPM, công cụ tính ngay Vc và cho biết khoảng Vc có hợp lý với vật liệu đã chọn hay không. Mở công cụ tốc độ cắt và thử với dao Ø20, 1500 vòng/ph để thấy kết quả 94,2 m/ph.',
    ],
  },
  {
    slug: 'tai-sao-can-tinh-chip-load',
    title: 'Tại sao cần tính Chip Load (fz)?',
    tag: 'Cắt gọt',
    excerpt:
      'Chip load là lượng vật liệu mỗi răng dao ăn trong một vòng quay. Tính đúng fz giúp dao không gãy, không mòn sớm và bề mặt đạt yêu cầu.',
    relatedToolId: 'chip-load',
    relatedToolHref: '/chip-load',
    content: [
      'Chip load (fz, mm/răng) là độ dày phoi mà mỗi lưỡi cắt gọt đi trong một vòng quay, tính bằng fz = Vf / (z × n). Đây là thông số "sức khỏe" của lưỡi cắt: fz quá lớn, lưỡi chịu lực quá sức và gãy; fz quá nhỏ, lưỡi không cắt mà chà xát, sinh nhiệt, mòn nhanh và bề mặt bị chai cứng. Nhiều dao gãy không phải vì máy yếu mà vì người vận hành tăng Vf (bước tiến bàn) mà quên chia cho số me dao và RPM.',
      'Ví dụ cụ thể: chạy bàn Vf = 600 mm/ph với dao 3 me ở n = 2500 vòng/ph thì fz = 600 / (3 × 2500) = 0,08 mm/răng — giá trị đẹp cho dao Ø10 phay thép nhẹ hoặc nhôm. Nhưng nếu giữ nguyên Vf = 600 mà đổi sang dao 2 me và giảm RPM còn 1200 (vì dao lớn hơn), fz vọt lên 600 / (2 × 1200) = 0,25 mm/răng, rất dễ mẻ dao với dao nhỏ. Ngược lại, fz dưới 0,02 mm/răng với dao carbide thường gây mòn chà xát, tuổi dao giảm thay vì tăng.',
      'Mỗi vật liệu và đường kính dao có khoảng fz khuyến nghị: dao Ø10 phay thép thường fz ≈ 0,05–0,12 mm/răng, phay nhôm fz ≈ 0,08–0,2 mm/răng; dao càng nhỏ fz càng bé. Khi phay rãnh sâu hoặc dao vươn dài, nên giảm fz 20–30% để bù độ rung. Một dấu hiệu fz hợp lý là phoi ra dạng xoắn hoặc mảnh đều, tiếng cắt đều, bề mặt không có vết cháy.',
      'Hãy kiểm tra chip load của bạn bằng công cụ tính Chip Load: nhập Vf, số me dao và RPM để biết ngay fz và đối chiếu với khoảng khuyến nghị. Nhập thử Vf = 600, z = 3, n = 2500 để thấy kết quả 0,08 mm/răng.',
    ],
  },
  {
    slug: 'phan-biet-feed-va-speed',
    title: 'Phân biệt Feed (Vf) và Speed (Vc, n)',
    tag: 'Cắt gọt',
    excerpt:
      'Speed quyết định nhiệt độ vùng cắt, feed quyết định lực cắt và độ nhám. Nhầm lẫn hai khái niệm này là nguyên nhân phổ biến khiến dao nhanh hỏng.',
    relatedToolId: 'luong-chay-dao',
    relatedToolHref: '/luong-chay-dao',
    content: [
      'Trong gia công cắt gọt, "speed" là tốc độ quay: gồm tốc độ cắt Vc (m/ph) và vòng quay n (vòng/ph), điều khiển nhiệt độ tại lưỡi cắt. "Feed" là lượng chạy dao Vf (mm/ph) — tốc độ bàn máy tiến vào phôi, điều khiển lực cắt và độ dày phoi. Công thức nối hai nhóm là Vf = fz × z × n: feed phụ thuộc vào chip load mỗi răng, số răng và RPM. Tăng speed làm dao nóng hơn; tăng feed làm dao "nặng tải" hơn.',
      'Ví dụ: dao phay Ø16, 4 me, n = 2000 vòng/ph, fz = 0,08 mm/răng thì Vf = 0,08 × 4 × 2000 = 640 mm/ph. Nếu bề mặt xấu, người mới hay giảm feed, nhưng đôi khi nguyên nhân là speed quá thấp gây lẹo dao — lúc đó phải tăng speed. Ngược lại, dao gãy khi ăn sâu thường do feed quá lớn, phải giảm Vf hoặc giảm chiều sâu cắt, chứ tăng RPM không cứu được vì lực cắt trên mỗi răng vẫn quá sức.',
      'Quy tắc thực hành: chọn speed theo vật liệu và dao (tra Vc), chọn feed theo độ cứng vững và độ nhám yêu cầu. Gia công thô ưu tiên feed lớn + chiều sâu lớn với speed vừa phải để bóc phoi nhanh. Gia công tinh giảm feed (fz nhỏ) và có thể nâng speed để bề mặt bóng. Khi máy rung, giảm chiều sâu cắt trước, rồi mới giảm feed, cuối cùng mới giảm speed — vì giảm speed làm tăng lực cắt tương đối và có thể rung hơn.',
      'Để thành thạo mối quan hệ này, hãy dùng công cụ tính lượng chạy dao: thay đổi fz, số me và RPM để xem Vf biến động thế nào. Bắt đầu với ví dụ fz = 0,1, z = 4, n = 2000 để thấy Vf = 800 mm/ph.',
    ],
  },
  {
    slug: 'mrr-la-gi',
    title: 'MRR là gì? Cách tính tốc độ bóc tách vật liệu',
    tag: 'Cắt gọt',
    excerpt:
      'MRR (Material Removal Rate) đo năng suất bóc phoi theo cm³/ph. Đây là con số dùng để so sánh phương án gia công và lập kế hoạch sản xuất.',
    relatedToolId: 'mrr',
    relatedToolHref: '/mrr',
    content: [
      'MRR là thể tích vật liệu bị bóc đi trong một phút, công thức phay: MRR = ap × ae × Vf (ap là chiều sâu cắt, ae là chiều rộng cắt, Vf là lượng chạy dao). Đơn vị thường dùng là cm³/ph. Ví dụ ap = 3 mm, ae = 10 mm, Vf = 500 mm/ph thì MRR = 3 × 10 × 500 = 15 000 mm³/ph = 15 cm³/ph. Hai phương án khác nhau nhưng MRR bằng nhau thì thời gian bóc cùng một khối phoi là như nhau — đó là lý do MRR là "ngôn ngữ chung" khi so sánh.',
      'MRR liên hệ trực tiếp với công suất máy: bóc phoi càng nhanh cần công suất càng lớn. Công suất cắt P ≈ (lực cắt riêng × MRR) / 60 000, nên nếu MRR tính ra đòi hỏi P vượt quá công suất trục chính, máy sẽ quá tải, sụt tốc và dao hỏng. Thực tế, máy phay CNC cỡ vừa (7,5 kW) bóc thép với MRR khoảng 20–40 cm³/ph là hợp lý; bóc nhôm có thể đạt 100–300 cm³/ph nhờ lực cắt riêng thấp. Vì vậy đừng chỉ tăng Vf bừa bãi mà hãy kiểm tra MRR so với khả năng máy.',
      'Muốn tăng MRR an toàn, ưu tiên tăng ae và ap (ăn rộng, ăn sâu) trước khi tăng Vf, vì tăng feed làm tăng lực trên mỗi răng nhanh nhất. Với dao hiệu suất cao (high-feed mill), chiến lược ngược lại: ap nhỏ, Vf lớn. Dù theo chiến lược nào, hãy tăng từng thông số 10–15% một và nghe tiếng máy, quan sát phoi. Phoi đổi màu xanh đậm, máy rung mạnh hoặc dòng điện trục chính vọt cao đều là tín hiệu MRR đã vượt ngưỡng.',
      'Dùng công cụ tính MRR để thử các phương án: nhập ap, ae, Vf và so sánh MRR, từ đó chọn phương án nhanh nhất mà máy chịu được. Thử ngay với ap = 3, ae = 10, Vf = 500 để kiểm chứng kết quả 15 cm³/ph.',
    ],
  },
  {
    slug: 'cach-giam-thoi-gian-gia-cong',
    title: 'Cách giảm thời gian gia công (Tm) mà không hại dao',
    tag: 'Cắt gọt',
    excerpt:
      'Thời gian cắt Tm = L / Vf chỉ là một phần. Giảm thời gian thực tế cần tối ưu cả đường chạy dao, số lần gá và thời gian phụ.',
    relatedToolId: 'thoi-gian-gia-cong',
    relatedToolHref: '/thoi-gian-gia-cong',
    content: [
      'Thời gian cắt lý thuyết Tm = L / Vf, với L là tổng chiều dài đường dao (gồm đoạn vào/ra dao). Ví dụ phay rãnh dài 200 mm, cộng vào/ra dao 20 mm thành L = 220 mm, Vf = 400 mm/ph thì Tm = 220 / 400 = 0,55 phút (33 giây). Nhưng thời gian thực tế còn gồm thay dao, gá đặt, đo kiểm, chạy không. Với lô hàng trăm chi tiết, thời gian phụ này thường chiếm 30–50% tổng thời gian — đó mới là "mỏ vàng" để tối ưu.',
      'Bốn đòn bẩy giảm thời gian hiệu quả nhất: một là tăng Vf và MRR trong giới hạn máy cho phép; hai là rút ngắn đường chạy dao thừa (giảm khoảng cách an toàn, dùng chu trình khoan sâu tối ưu, vào dao theo đường cong thay vì đâm thẳng); ba là giảm số lần gá bằng cách gia công nhiều mặt trong một lần gá hoặc dùng đồ gá chuyên dụng; bốn là giảm thời gian thay dao bằng cách gom nguyên công cùng dao và chuẩn bị dao offline. Ví dụ tăng Vf từ 400 lên 600 mm/ph với L = 220 mm giảm Tm từ 33 giây xuống 22 giây — tiết kiệm 11 giây/chiếc, tức gần 1 giờ cho lô 300 chiếc.',
      'Lưu ý: tăng tốc mà dao mòn nhanh hơn có thể phản tác dụng vì dừng máy thay dao và phế phẩm tăng. Hãy theo dõi tuổi dao (số chi tiết/dao) sau mỗi lần tăng tốc. Nếu tuổi dao giảm quá nửa trong khi thời gian chỉ giảm 20%, phương án đó không kinh tế. Với chi tiết yêu cầu độ chính xác cao, lát cắt tinh cuối cùng nên giữ thông số ổn định, chỉ tối ưu các lát thô.',
      'Trước khi nhận báo giá hoặc lập kế hoạch, hãy ước lượng bằng công cụ tính thời gian gia công: nhập chiều dài đường dao và Vf để ra Tm từng nguyên công, cộng dồn thành tổng thời gian. Thử với L = 220 mm và Vf = 400 mm/ph để thấy kết quả 33 giây.',
    ],
  },
  {
    slug: 'cong-suat-cat',
    title: 'Công suất cắt (P): máy của bạn có đủ khỏe?',
    tag: 'Cắt gọt',
    excerpt:
      'P = (Fc × Vc) / 60000 cho biết công suất cần thiết tại lưỡi cắt. So sánh với công suất trục chính để tránh quá tải.',
    relatedToolId: 'cong-suat-cat',
    relatedToolHref: '/cong-suat-cat',
    content: [
      'Công suất cắt P (kW) là công suất cơ học tiêu thụ ngay tại vùng cắt, tính bằng P = (Fc × Vc) / 60000 với Fc là lực cắt chính (N) và Vc là tốc độ cắt (m/ph). Ví dụ Fc = 1200 N, Vc = 150 m/ph thì P = (1200 × 150) / 60000 = 3 kW. Con số này phải nhỏ hơn công suất khả dụng của trục chính (thường lấy 70–80% công suất danh định để trừ hao hiệu suất và dự phòng). Máy ghi 5,5 kW thì chỉ nên cắt ở mức yêu cầu khoảng 4 kW trở xuống.',
      'Lực cắt Fc phụ thuộc tiết diện phoi (ap × fz) và lực cắt riêng của vật liệu: thép khoảng 1500–2500 N/mm², gang 900–1400 N/mm², nhôm chỉ 400–800 N/mm². Vì vậy cùng một MRR, cắt thép tốn công suất gấp 3–4 lần cắt nhôm. Khi tăng chiều sâu cắt ap gấp đôi, Fc và P cũng gần như tăng gấp đôi — đó là lý do máy nhỏ vẫn phay được thép nếu ăn mỏng nhiều lát, nhưng không thể ăn sâu một lát như máy lớn. Dấu hiệu thiếu công suất: trục chính sụt tốc, tiếng máy ì, bề mặt có vết rung.',
      'Thực hành an toàn: với máy cũ hoặc dây đai đã mòn, chỉ dùng 60% công suất danh định. Khi lập trình, đặt giới hạn tải trục chính (load meter) khoảng 70–80%; nếu vượt, giảm ap trước rồi mới giảm Vf. Với gia công hàng loạt, nên đo dòng điện hoặc tải thực tế ở lát cắt nặng nhất và ghi lại vào phiếu công nghệ để lần sau cứ thế chạy, không phải "mò" lại.',
      'Hãy kiểm tra trước bằng công cụ tính công suất cắt: nhập lực cắt và Vc để biết P yêu cầu, rồi đối chiếu với máy của bạn. Thử với Fc = 1200 N và Vc = 150 m/ph để thấy kết quả 3 kW.',
    ],
  },
  {
    slug: 'mo-men-xoan',
    title: 'Mô-men xoắn (T): từ công suất và RPM',
    tag: 'Cắt gọt',
    excerpt:
      'T = (P × 9550) / n. Hiểu mô-men giúp chọn đúng nấc tốc độ khi tiện ren, khoan lỗ lớn hoặc taro bằng máy.',
    relatedToolId: 'mo-men-xoan',
    relatedToolHref: '/mo-men-xoan',
    content: [
      'Mô-men xoắn T (N·m) là "sức vặn" của trục chính, tính bằng T = (P × 9550) / n với P tính bằng kW và n tính bằng vòng/ph. Ví dụ động cơ 5,5 kW tại 1450 vòng/ph cho T = (5,5 × 9550) / 1450 ≈ 36,2 N·m. Điểm mấu chốt: cùng một công suất, RPM càng thấp thì mô-men càng lớn. Đó là lý do máy tiện có hộp số cơ khí: tiện ren hoặc khoan lỗ lớn ở RPM thấp nhưng lực vặn rất khỏe.',
      'Ứng dụng điển hình: taro M20 trên máy khoan cần mô-men lớn ở RPM thấp (60–100 vòng/ph); nếu dùng máy chỉ có biến tần mà không có hộp số giảm tốc, mô-men ở RPM thấp sẽ không đủ và taro kẹt, gãy. Tương tự, khoan lỗ Ø40 trên thép cần mô-men gấp nhiều lần khoan Ø10. Khi đọc catalogue máy, hãy nhìn đường cong công suất – mô-men: máy có cấp số thấp (low gear) giữ được mô-men cao ở RPM thấp, còn máy truyền trực tiếp (direct drive) yếu dần khi giảm tốc.',
      'Mẹo chọn nấc máy: công việc nặng (khoan lớn, taro lớn, tiện thô đường kính lớn) chọn nấc RPM thấp để lấy mô-men; công việc tinh (phay dao nhỏ, khoan mồi) chọn nấc RPM cao để lấy tốc độ. Nếu máy báo quá tải mà RPM đang cao, thử giảm RPM và tăng feed tương ứng: lực cắt giữ nguyên nhưng mô-men khả dụng tăng lên. Ngược lại, đừng bao giờ "cố" taro ren lớn ở RPM cao vì mô-men không đủ và taro gãy trong lỗ rất khó xử lý.',
      'Tính nhanh mô-men của máy bạn bằng công cụ tính mô-men xoắn: nhập công suất và RPM để ra T, rồi so với yêu cầu của mũi khoan/taro. Thử với P = 5,5 kW và n = 1450 để kiểm chứng 36,2 N·m.',
    ],
  },
  {
    slug: 'h7-g6-nghia-la-gi',
    title: 'H7/g6 nghĩa là gì? Hiểu kiểu lắp trong 5 phút',
    tag: 'Dung sai',
    excerpt:
      'H7/g6 là kiểu lắp lỏng kinh điển: lỗ H7 luôn lớn hơn trục g6, tạo khe hở để chi tiết trượt nhẹ nhàng.',
    relatedToolId: 'dung-sai',
    relatedToolHref: '/dung-sai',
    content: [
      'Ký hiệu H7/g6 gồm hai phần: H7 là miền dung sai của lỗ (chữ hoa = lỗ), g6 là miền dung sai của trục (chữ thường = trục). Số 7 và 6 là cấp chính xác IT: số càng nhỏ càng chính xác. Chữ H nghĩa là lỗ cơ bản — sai lệch dưới của lỗ bằng 0, tức lỗ nhỏ nhất đúng bằng kích thước danh nghĩa. Chữ g nghĩa là trục luôn nằm dưới danh nghĩa một khoảng, nên lắp vào lỗ H luôn có khe hở. Đó là bản chất "lắp lỏng" của H7/g6.',
      'Ví dụ số với đường kính danh nghĩa Ø25: lỗ H7 có giới hạn 25,000–25,021 mm (tra IT7 khoảng 18–30 = 21 micron); trục g6 có giới hạn khoảng 24,980–24,993 mm. Khe hở nhỏ nhất = 25,000 − 24,993 = 0,007 mm; khe hở lớn nhất = 25,021 − 24,980 = 0,041 mm. Chi tiết trượt êm, không rơ nhiều — lý tưởng cho bạc lót, piston, trục dẫn hướng. Nếu cần quay tốc độ cao với màng dầu dày hơn, chuyển sang H7/f7 cho khe hở lớn hơn.',
      'Hệ lỗ cơ bản H (như H7) được ưa chuộng vì chỉ cần một bộ dao chuốt/doa chuẩn cho lỗ, còn trục gia công tiện/mài đạt cấp cần thiết — kinh tế hơn hệ trục cơ bản. Thứ tự lỏng dần của các kiểu lắp H7 thông dụng: H7/g6 (lỏng nhẹ) → H7/f7 (lỏng vừa) → H7/k6, H7/n6 (trung gian) → H7/p6, H7/r6, H7/s6 (chặt dần). Chọn sai kiểu lắp là lỗi đắt tiền: lắp lỏng vào chỗ cần chặt gây xoay trượt phá hỏng trục; lắp chặt vào chỗ cần trượt gây kẹt cứng.',
      'Để tra nhanh khe hở lớn nhất/nhỏ nhất của mọi kiểu lắp, dùng công cụ dung sai lắp ghép: nhập đường kính và chọn kiểu lắp, công cụ tính ngay giới hạn lỗ/trục và phân loại lắp lỏng, trung gian hay lắp chặt. Thử với Ø25 H7/g6 để thấy khe hở 0,007–0,041 mm.',
    ],
  },
  {
    slug: 'cach-doc-dung-sai',
    title: 'Cách đọc dung sai trên bản vẽ: ES, EI, IT',
    tag: 'Dung sai',
    excerpt:
      'Dung sai là phạm vi kích thước cho phép. Nắm ES, EI và cấp IT giúp bạn đọc mọi ký hiệu như Ø25H7 hay 40±0,1.',
    relatedToolId: 'dung-sai',
    relatedToolHref: '/dung-sai',
    content: [
      'Mọi kích thước gia công đều có sai số, nên bản vẽ quy định một "hành lang" cho phép gọi là miền dung sai T = kích thước lớn nhất − kích thước nhỏ nhất. Hai biên của hành lang được ghi dưới dạng sai lệch so với kích thước danh nghĩa: ES là sai lệch trên, EI là sai lệch dưới. Ví dụ Ø25 H7 tương đương 25,000–25,021 mm, tức ES = +0,021 mm và EI = 0. Còn ghi trực tiếp 40±0,1 nghĩa là 39,9–40,1 mm, ES = +0,1 và EI = −0,1.',
      'Cấp chính xác IT (ISO Tolerance) đánh số từ IT01 (siêu chính xác) đến IT18 (thô): số càng nhỏ, miền dung sai càng hẹp và gia công càng đắt. Quan hệ kích thước – cấp IT tra theo bảng ISO 286-1: cùng IT7, khoảng 0–3 mm chỉ cho phép 10 micron nhưng khoảng 120–180 mm cho phép tới 40 micron, vì chi tiết lớn khó chính xác tuyệt đối như chi tiết nhỏ. Quy tắc nhớ: tiện thô đạt IT11–IT12, tiện tinh IT8–IT9, mài tinh IT6–IT7, mài siêu tinh/cắt dây đạt IT5.',
      'Khi đọc bản vẽ, hãy phân biệt ba loại ghi: kích thước tự do (không ghi dung sai, theo tiêu chuẩn chung như ISO 2768), kích thước có dung sai đối xứng (±), và ký hiệu miền dung sai chữ-số (H7, g6, Js...). Lỗi phổ biến là gia công mọi kích thước đều "cố chính xác" gây tốn kém; đúng ra chỉ siết chặt dung sai ở mặt lắp ghép chức năng, còn lại để thoáng để giảm giá thành. Một bản vẽ tốt luôn có ít dung sai khắt khe và nhiều kích thước tự do.',
      'Để tra giá trị IT theo kích thước, dùng công cụ dung sai: nhập đường kính danh nghĩa và cấp IT để ra miền dung sai micron. Thử với size 25 mm, grade IT7 để thấy kết quả 21 micron (0,021 mm).',
    ],
  },
  {
    slug: 'ren-he-met-va-unc',
    title: 'Ren hệ mét và ren UNC/UNF khác nhau thế nào?',
    tag: 'Ren',
    excerpt:
      'Ren mét ghi theo bước ren (mm), ren UNC/UNF ghi theo số ren trên 1 inch (TPI). Hiểu hai hệ giúp bạn đọc đúng ký hiệu và chọn đúng taro.',
    relatedToolId: 'ren',
    relatedToolHref: '/ren',
    content: [
      'Ren hệ mét ISO (ký hiệu M) đo bước ren trực tiếp bằng mm: M10 × 1,5 nghĩa là đường kính 10 mm, mỗi vòng ren tiến 1,5 mm. Ren Unified của Mỹ (UNC thô, UNF tinh) đo bằng TPI — số ren trên một inch chiều dài: 1/4"-20 UNC nghĩa là đường kính 1/4 inch (6,35 mm), 20 ren/inch, tương đương bước 25,4 / 20 = 1,27 mm. Hai hệ không lắp lẫn được: cố vặn bulong UNC vào đai ốc mét sẽ phá hỏng cả hai.',
      'So sánh nhanh ba cỡ inch phổ biến: 1/4" có UNC 20 TPI (bước 1,27 mm) và UNF 28 TPI (bước 0,907 mm); 3/8" có UNC 16 TPI (1,588 mm) và UNF 24 TPI (1,058 mm); 1/2" có UNC 13 TPI (1,954 mm) và UNF 20 TPI (1,27 mm). Quy luật: UNC bước lớn, chịu tải và chống tuột tốt khi rung, tháo lắp nhanh; UNF bước nhỏ, điều chỉnh tinh, chịu mỏi tốt hơn, nhưng dễ kẹt ren khi bẩn. Thiết bị Mỹ, dầu khí, hàng không thường dùng UNC/UNF nên xưởng sửa chữa phải có đủ taro hai hệ.',
      'Cách đọc ký hiệu đầy đủ: M12 × 1,75 là ren mét thô (bước thô có thể ghi gọn M12); M12 × 1,25 là ren mét tinh; 3/8"-16 UNC là ren thô inch; 3/8"-24 UNF là ren tinh inch. Khi thay thế, chỉ được đổi tương đương trong cùng hệ và cùng cấp bền (ví dụ bulong 8.8). Một bẫy thường gặp: ren ống G (BSPP) cũng đo bằng inch nhưng góc ren và đường kính khác ren UNC — không dùng taro UNC để làm ren ống.',
      'Tra nhanh bước ren, TPI và mũi khoan taro của cả hai hệ bằng công cụ tra cứu ren: gõ M10 hoặc 1/4 để ra đầy đủ thông số thô/tinh. Thử gõ "M10" và "1/4" để so sánh M10 × 1,5 với 1/4"-20 UNC.',
    ],
  },
  {
    slug: 'cach-chon-mui-khoan-ta-ro',
    title: 'Cách chọn mũi khoan trước khi taro ren',
    tag: 'Ren',
    excerpt:
      'Mũi khoan taro ≈ đường kính ren trừ bước ren (D − p). Khoan đúng giúp ren đủ chiều cao mà taro nhẹ, ít gãy.',
    relatedToolId: 'ren',
    relatedToolHref: '/ren',
    content: [
      'Trước khi taro ren trong, phải khoan lỗ mồi với đường kính tính bằng D_khoan ≈ D − p (D là đường kính danh nghĩa, p là bước ren). Ví dụ taro M10 × 1,5 khoan Ø8,5 mm; M6 × 1 khoan Ø5 mm; M12 × 1,75 khoan Ø10,2 mm. Công thức này cho chiều cao ren khoảng 75–80%, đủ bền cho đa số mối ghép mà taro nhẹ nhàng. Khoan nhỏ hơn, taro phải cắt quá nhiều vật liệu nên nặng tay và dễ gãy, nhất là với taro tay.',
      'Vật liệu quyết định điều chỉnh: với thép cứng, inox và titan, có thể khoan lớn hơn công thức 0,05–0,1 mm để taro nhẹ mà ren vẫn đủ bền (chiều cao ren 65–70% là đủ cho vật liệu cứng). Với gang xám giòn, đỉnh ren dễ vỡ nên cũng khoan lớn hơn một chút. Ngược lại, với nhôm và đồng mềm, khoan đúng công thức để ren đầy, vì vật liệu mềm cần chiều cao ren lớn mới chịu tải tốt. Luôn vát mép miệng lỗ (chamfer 90°) trước khi taro để taro vào đúng tâm và ren đầu không bị sứt.',
      'Hai lỗi kinh điển: một là khoan lệch tâm hoặc khoan xiên khiến taro gãy — khắc phục bằng cách khoan mồi tâm, dùng dưỡng hoặc taro trên máy; hai là taro không bẻ phoi ngược (với taro tay phải xoay lui 1/4 vòng sau mỗi 1–2 vòng tiến) khiến phoi kẹt gãy taro. Với lỗ sâu quá 2× đường kính, nên taro rãnh xoắn để thoát phoi lên trên và dùng dầu cắt chuyên dụng, không dùng dầu nhớt thường cho inox và titan.',
      'Không cần nhớ bảng: dùng công cụ tra cứu ren, gõ ký hiệu như M10 để ra ngay mũi khoan cho cả bước thô và bước tinh. Thử gõ "M10" để thấy khoan Ø8,5 cho bước thô và Ø8,75 cho bước tinh M10 × 1,25.',
    ],
  },
  {
    slug: 'banh-rang-module',
    title: 'Module bánh răng (m) là gì? Cách tính nhanh',
    tag: 'Bánh răng',
    excerpt:
      'Module m là "cỡ răng": d = m × z. Hai bánh răng chỉ ăn khớp khi cùng module và cùng góc áp lực.',
    relatedToolId: 'banh-rang',
    relatedToolHref: '/banh-rang',
    content: [
      'Module m (mm) là thông số gốc của bánh răng trụ răng thẳng: m = đường kính vòng chia d chia cho số răng z, tức d = m × z. Ví dụ bánh răng m = 2 với z = 30 răng có vòng chia d = 60 mm; đường kính đỉnh răng da = d + 2m = 64 mm; đường kính chân răng df = d − 2,5m = 55 mm. Module càng lớn, răng càng to khỏe và chịu tải càng cao — đó là lý do hộp số tải nặng dùng m = 4–8 còn đồ chơi dùng m = 0,5–1.',
      'Điều kiện ăn khớp bắt buộc: hai bánh răng phải cùng module và cùng góc áp lực (thường 20°). Khoảng cách trục hai bánh răng ngoài ăn khớp: a = m × (z1 + z2) / 2. Ví dụ m = 2, z1 = 30, z2 = 45 thì a = 2 × 75 / 2 = 75 mm. Nếu khoảng cách trục thực tế lệch dù chỉ 0,1–0,2 mm, cặp răng sẽ ồn, mòn nhanh hoặc kẹt — vì vậy vỏ hộp số phải gia công chính xác và thường doa lỗ ổ bi đạt IT7.',
      'Khi cần thay thế bánh răng gãy mà mất bản vẽ, đo module bằng cách đo đường kính đỉnh da và đếm răng: m ≈ da / (z + 2). Ví dụ đo được da ≈ 64 mm, đếm 30 răng thì m ≈ 64 / 32 = 2. Đo thêm bước răng trên vòng chia (p = π × m ≈ 6,28 mm với m = 2) để kiểm chứng. Nên đo trên 3–5 răng rồi lấy trung bình vì răng đã mòn. Module tiêu chuẩn theo dãy ưu tiên (1; 1,25; 1,5; 2; 2,5; 3; 4; 5...) — kết quả đo gần số nào nhất thì đó là module chuẩn.',
      'Tính nhanh mọi thông số bánh răng (vòng chia, đỉnh, chân, khoảng cách trục) bằng công cụ bánh răng: nhập module và số răng để ra đầy đủ kích thước. Thử với m = 2, z = 30 để kiểm chứng d = 60 mm và da = 64 mm.',
    ],
  },
  {
    slug: 'cach-tinh-khoi-luong-phoi',
    title: 'Cách tính khối lượng phôi để báo giá và đặt hàng',
    tag: 'Vật liệu',
    excerpt:
      'm = V × ρ. Tính đúng khối lượng phôi giúp báo giá vật liệu chính xác và đặt mua không thiếu, không thừa.',
    relatedToolId: 'khoi-luong',
    relatedToolHref: '/khoi-luong',
    content: [
      'Mọi bài toán khối lượng đều xoay quanh m = V × ρ: thể tích nhân khối lượng riêng. Khối lượng riêng cần nhớ: thép ≈ 7,85 g/cm³, inox ≈ 7,9 g/cm³, gang ≈ 7,2 g/cm³, nhôm ≈ 2,7 g/cm³, đồng đỏ ≈ 8,9 g/cm³, đồng thau ≈ 8,5 g/cm³. Thể tích phôi trụ: V = (π × D² / 4) × L; phôi hộp: V = L × W × H. Chỉ cần thống nhất đơn vị cm trước khi nhân là ra khối lượng gram, chia 1000 ra kg.',
      'Ví dụ thực tế: phôi thép S45C Ø60 × 200 mm có V = 3,1416 × 3600 / 4 × 200 = 565 487 mm³ = 565,49 cm³, nhân 7,85 được 4 439 g ≈ 4,44 kg. Còn tấm nhôm A6061 500 × 300 × 20 mm: V = 3 000 000 mm³ = 3000 cm³, nhân 2,7 được 8100 g = 8,1 kg. Khi báo giá, lấy khối lượng phôi (chưa trừ phoi) nhân đơn giá vật liệu rồi cộng công gia công — nhiều xưởng lỗ vì tính theo khối lượng chi tiết thành phẩm mà quên phần phoi và đầu kẹp.',
      'Ba điểm hay sai: một là quên đổi mm³ sang cm³ (chia 1000) khiến kết quả lệch 1000 lần; hai là dùng nhầm khối lượng riêng (lấy 7,85 cho nhôm); ba là với ống hoặc chi tiết rỗng phải trừ thể tích lỗ trong. Khi đặt mua, cộng thêm lượng dư gia công (mỗi mặt 2–5 mm tùy kích thước) và làm tròn lên quy cách phôi bán sẵn. Với lô lớn, sai số 5% khối lượng cũng thành tiền triệu, nên luôn tính bằng công cụ thay vì nhẩm.',
      'Dùng công cụ tính khối lượng: chọn vật liệu (tự điền ρ), nhập kích thước phôi trụ hoặc phôi hộp để ra ngay khối lượng kg. Thử với phôi thép Ø60 × 200 mm để kiểm chứng 4,44 kg.',
    ],
  },
  {
    slug: 'doi-don-vi-inch-mm',
    title: 'Đổi đơn vị inch – mm và các đơn vị cơ khí khác',
    tag: 'Đơn vị',
    excerpt:
      '1 inch = 25,4 mm chính xác. Nắm vững đổi đơn vị giúp đọc bản vẽ nước ngoài và cài đặt máy không nhầm lẫn.',
    relatedToolId: 'chuyen-doi-don-vi',
    relatedToolHref: '/chuyen-doi-don-vi',
    content: [
      'Đẳng thức gốc của cơ khí: 1 inch = 25,4 mm chính xác (không phải 25 hay 2,54 cm nhẩm tròn). Từ đó suy ra 1/2" = 12,7 mm; 1/4" = 6,35 mm; 3/8" = 9,525 mm; 1 foot = 304,8 mm. Chiều ngược lại: 1 mm ≈ 0,03937 inch. Khi đọc bản vẽ Mỹ, đường kính ren 1/2"-13 UNC nghĩa là Ø12,7 mm với 13 ren/inch (bước ≈ 1,954 mm). Sai lầm phổ biến là đổi 1/2" thành 12 mm tròn rồi tiện bulong bị lỏng — với ren, sai 0,7 mm là hỏng hoàn toàn.',
      'Ngoài chiều dài, xưởng cơ khí còn đổi thường xuyên: lực (1 kgf = 9,80665 N; 1 lbf ≈ 4,448 N), áp suất (1 bar = 0,1 MPa ≈ 14,5 psi; 1 MPa ≈ 145 psi), công suất (1 HP ≈ 0,7457 kW), mô-men (1 N·m ≈ 0,738 ft·lb), tốc độ cắt (1 m/min ≈ 3,281 ft/min). Ví dụ máy nén ghi 8 bar tương đương 0,8 MPa; động cơ 10 HP tương đương 7,46 kW. Khi cài đặt máy CNC hệ inch (G20) và hệ mét (G21), nhầm đơn vị khiến dao chạy sai 25,4 lần — luôn kiểm tra mã G đơn vị đầu chương trình.',
      'Mẹo làm tròn an toàn: đổi để mua vật liệu có thể làm tròn lên quy cách bán sẵn (9,525 mm mua tròn 10 mm rồi gia công), nhưng đổi để gia công phải giữ đủ số lẻ (ít nhất 3 chữ số thập phân với inch). Với dung sai, 0,001 inch = 0,0254 mm = 25,4 micron — tức dung sai ±0,001" tương đương ±0,025 mm, là cấp chính xác thông thường của tiện tinh. Ghi chép song ngữ inch/mm trên phiếu công nghệ khi làm hàng xuất khẩu để thợ không phải đổi tay.',
      'Đổi nhanh mọi đơn vị trong một chỗ bằng công cụ chuyển đổi đơn vị: nhập giá trị inch ra ngay mm và ngược lại, kèm lực, áp suất, công suất. Thử đổi 1/2 inch để thấy kết quả 12,7 mm.',
    ],
  },
];

export const LEARN_TAGS: string[] = [
  'Cắt gọt',
  'Ren',
  'Dung sai',
  'Bánh răng',
  'Vật liệu',
  'Đơn vị',
];

/** Lấy bài viết theo slug. */
export function getPostBySlug(slug: string): LearnPost | undefined {
  return LEARN_POSTS.find((p) => p.slug === slug.trim().toLowerCase());
}

/** Lọc bài viết theo tag. */
export function getPostsByTag(tag: string): LearnPost[] {
  return LEARN_POSTS.filter((p) => p.tag === tag);
}
