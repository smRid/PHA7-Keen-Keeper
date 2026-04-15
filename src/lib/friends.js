import { readFile } from "fs/promises";
import path from "path";

const friendsDataPath = path.join(process.cwd(), "public", "data.json");

export const getFriends = async () => {
  const friendsFile = await readFile(friendsDataPath, "utf8");
  return JSON.parse(friendsFile);
};

export const getFriendById = async (id) => {
  const friends = await getFriends();
  return friends.find((friend) => String(friend.id) === String(id));
};
