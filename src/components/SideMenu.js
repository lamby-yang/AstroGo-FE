import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
import OptionsMenu from "./OptionsMenu";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react"; // 确保导入 useState 和 useEffect
import axios from "axios"; // 确保导入 axios

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

// 内联的 useUsers 钩子
function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/all/");
        if (response.data.code === 0 && response.data.data) {
          // 映射 API 返回的用户数据结构
          const formattedUsers = response.data.data.map((user) => ({
            id: user.uid.toString(),
            name: user.user_name,
            avatarUrl: user.avatar_url,
            phone: user.phone_number,
            department: user.department,
            age: user.age,
            createTime: user.creat_time,
            lastLogin: user.last_login_time,
          }));
          setUsers(formattedUsers);
        } else {
          throw new Error(response.data.msg || "无法获取用户数据");
        }
      } catch (err) {
        setError(err);
        console.error("获取用户数据失败:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
}

export default function SideMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  // 使用自定义的 useUsers 钩子获取数据
  const { users, loading, error } = useUsers();

  // 从当前URL中提取用户ID和页面名称
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentPage = pathSegments[0] || "profile";

  // 设置默认用户ID为第一个用户的id（如果有用户）
  const defaultUserId = users.length > 0 ? users[0].id : null;
  const currentUserId = pathSegments[1] || defaultUserId;

  // 处理用户选择
  const handleUserChange = (event) => {
    const newUserId = event.target.value;
    // 导航到当前页面加上新用户ID的路径
    navigate(`/${currentPage}/${newUserId}`);
  };

  // 获取当前选中用户的信息
  const currentUser = users.find((user) => user.id === currentUserId);

  // 处理错误情况
  if (error) {
    return (
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          [`& .${drawerClasses.paper}`]: {
            backgroundColor: "background.paper",
          },
        }}
      >
        <Box sx={{ p: 2, color: "error.main" }}>
          <Typography variant="body2">
            加载用户数据失败: {error.message}
          </Typography>
        </Box>
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      ></Box>
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MenuContent currentUserId={currentUserId} />
      </Box>
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            sizes="small"
            alt={currentUser ? currentUser.name : "用户头像"}
            src={
              currentUser?.avatarUrl || "/static/images/avatar/placeholder.jpg"
            }
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {!loading && users?.length > 0 ? (
              <Select
                value={currentUserId || ""}
                onChange={handleUserChange}
                fullWidth
                size="small"
                sx={{
                  fontWeight: 500,
                  "& .MuiSelect-select": { py: 0.5 },
                }}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, lineHeight: "16px" }}
              >
                {loading ? "加载中..." : "无可用用户"}
              </Typography>
            )}
            {/* <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {currentUser?.phone || "未知号码"}
            </Typography> */}
          </Box>
          <OptionsMenu />
        </Stack>
      </Box>
    </Drawer>
  );
}
