class User {
  id = "";
  email = "";
  full_name = "";
  username = "";
  // photo_url = "";
  created_at = "";
  updated_at = "";
  deleted_at = "";

  constructor(user) {
    this.id = user.uid || user.id || this.id;
    this.email = user.email || this.email;
    this.full_name = user.full_name || this.full_name;
    this.username = user.username || this.username;
    // this.photo_url = user.photo_url || this.photo_url;
    this.created_at = user.created_at || new Date().getTime();
    this.updated_at = new Date().getTime();
    this.deleted_at = user.deleted_at || this.deleted_at;
  }
}

export default User;
