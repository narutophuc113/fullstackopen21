# fullstackopen21
fullstackopen.com

---------- Các viết hàm
funtion ABC(x){
	return XYZ
}
~~
(x)=>{
	return (XYZ)
}
~~
(x)=>(XYZ)
-----------
- Đừng define Component trong 1 Component khác
- setState khi được gọi sẽ re-render lại toàn bộ Component chứa nó
- State Hook chỉ có thể được cài ở trong Component, ko được cài đặt trong các hàm, điều kiện, loop
- eventHandler chỉ có thể là Hàm hoặc tham chiếu tới hàm. Không thể dùng để gọi hàm khác. Nếu muốn thì hàm khi gọi phải trả về là 1 hàm. (Đọc lại Function that return a funtion (fullstackopen21) để hiểu rõ hơn)