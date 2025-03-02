import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/slices/categorySlice";
import { getTasks } from "../redux/slices/taskSlice";

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return user;
};
