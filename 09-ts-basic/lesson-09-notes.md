Typescript là gì
Typescript = javscript + hệ thống kiểu dữ liệu (type system)

đặt món ăn
JS- (ko có type):
TS - (có type)

TS hoạt động như nào
Typesciprt sẽ kiểm tra lỗi ở thời điểm như sau
Bước 1: Viết code (IDE - vscode)
TS language server -> chạy ngầm trong IDE
-> gạch đỏ ngay khi mình gõ kiểu sai
-> gợi ý code
ĐÂY CHƯaphari là lúc biên dịch -> chỉ là bước IDE kiểm tra

Bươc 2; là bước biên dịch (chạy lệnh tsc hoặc npm run build)

file.ts -> (tsc complie) -> file.js
(type script) kiểm tra Typesciprt ->ko còn type và là js thuần 100%
xóa hết type -> chỉ giữ JS THUẦN
có : number
có :string

B3. run time -> trình duyệt/node js chyaj fikle .js này

typescript: bộ kiểm tra/.biên dịch typescript , cung caaps lệnh tsc
tsx: công cụ giúp chạy trực tiếp file .ts trong node js ->r ất tiện khi học

npm init -y
-> tạo file package.json.

npm install -D typescript tsx

npx tsx tenfile.ts

npx tsc tenfile.ts -> de tao ra file .js từ file ts

tạo folder .vscode ở root
settings.json
lint()
{
"code-runner.runInTerminal": true,
"code-runner.executorMap": {
"typescript": "npx tsx"
}
}

//các kiểu dữ liệu cơ bản
cú pháp
let tenBien : kiểu dữ liệu = giá trị

//type inference - typescript tư suy luận

union types - biến chứa nhiều kiểu

khi 1 biến có thẻ mang nhiều kiểu dữ liệu khác nhau, dùng dấu | dấu sổ đứng (gạch đsung) -> (pipe)

//nói đơn giuản uinion type giúp bạn liệt kê trước các khả năng hợp lệ, để 

