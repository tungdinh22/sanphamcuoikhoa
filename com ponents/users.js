function User (username,email,avatar="https://i.pinimg.com/originals/7c/d3/d4/7cd3d4a24e4821ead74b90cb8a55a692.jpg",point=0)
{

// tạo thuộc tính (property) cho đối tượng
    // this là từ khóa đại diện cho đối tượng được tạo ra từ constructor function
    this.username = username;
    this.email = email;
    this.avatar = avatar;
    this.point = point;
    // tao phuong thuc (method) cho doi tuong 
    this.displayName=function

    //   trả về đối tượng user sau khi được quy định thuộc tính và phương thức
  return {
    username: this.username,
    email: this.email,
    avatar: this.avatar,
    point: this.point,
  }
}

// tao doi tuong  tu constructor function
let userl = new User