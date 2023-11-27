import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const ProfileAvatar = ({ width, height }) => {
  const activeUser = useSelector((state) => state.user.user);

  return (
    <Avatar
      alt={activeUser.username && activeUser.username[0].toUpperCase()}
      src={activeUser.photo_url || activeUser.username[0].toUpperCase()}
      sx={{
        width: width,
        height: height,
      }}
    ></Avatar>
  );
};

export default ProfileAvatar;
