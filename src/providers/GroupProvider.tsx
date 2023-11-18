import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useAuth } from "./AuthProvider";
import { MessageType, useMessage } from "./MessageProvider";

export type CreateGroupType = {
  title: string;
  currency: string;
};
export type GroupContextType = {
  groups: Array<GroupType>;
  group: DocumentData | undefined;
  userMap: Map<string, string>;
  loading: boolean;
  createGroup: (data: CreateGroupType) => Promise<void>;
  getGroupById: (id: string) => Promise<DocumentData | null>;
  joinGroup: (code: string) => Promise<void>;
};

export interface GroupType extends DocumentData {
  title: string;
  creator: string;
  createdAt: Date;
  currency: string;
  code: string;
  members: Array<string>;
}

const GroupContext = createContext<GroupContextType>({
  loading: false,
  groups: [],
  group: undefined,
  userMap: new Map(),
  createGroup: async () => {},
  getGroupById: async () => Document,
  joinGroup: async () => {},
});

export const useGroup = () => {
  return useContext(GroupContext);
};

const GroupProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [groups, setGroups] = useState<Array<GroupType>>([]);
  const [group, setGroup] = useState<DocumentData | undefined>(undefined);
  const [userMap, setUserMap] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { handleSetMessage } = useMessage();

  useEffect(() => {
    setLoading(true);
    getGroups();
    setLoading(false);
  }, [user]);

  const createGroup = async (data: CreateGroupType) => {
    try {
      setLoading(true);
      if (!user) throw new Error("Please login first");
      const groupRef = collection(db, "groups");
      const expenseRef = collection(db, "expenses");
      const expense = await addDoc(expenseRef, {
        expenses: [],
      });

      await addDoc(groupRef, {
        title: data.title,
        creator: user?.displayName,
        createdAt: new Date(),
        currency: data.currency,
        code: Math.random().toString(36).substring(2, 7),
        members: [user.email],
        expense_id: expense.id,
      });

      getGroups();
    } catch (e) {
      if (e instanceof Error) {
        handleSetMessage(e.message, MessageType.ERROR);
      } else {
        handleSetMessage("Unknown error", MessageType.ERROR);
      }
    } finally {
      setLoading(false);
    }
  };
  const getGroups = async () => {
    if (!user || !user.email) return null;
    const groupRef = collection(db, "groups");
    const groupSnapshot = await getDocs(groupRef);
    // Get group list when user email is in members

    const groupList = groupSnapshot.docs
      .map((doc: DocumentData) => {
        return { ...doc.data(), id: doc.id };
      })
      .filter((group: GroupType) => group.members.includes(user.email || ""));
    // const groupList = groupSnapshot.docs.map((doc: DocumentData) => {
    //   return { ...doc.data(), id: doc.id }
    // })
    setGroups(groupList);
    console.log("groupList", groupList);
    return groupList;
  };

  const joinGroup = async (code: string) => {
    if (!user || !user.email) {
      handleSetMessage("Please login first", MessageType.ERROR);
      return;
    }
    const groupRef = collection(db, "groups");
    const groupSnapshot = await getDocs(groupRef);
    const groupList = groupSnapshot.docs
      .map((doc: DocumentData) => {
        return { ...doc.data(), id: doc.id };
      })
      .filter((group: GroupType) => group.code === code);
    const result_group = groupList[0];
    if (!result_group) {
      handleSetMessage("Group not found", MessageType.ERROR);
      return;
    }

    if (result_group.members.includes(user.email)) {
      handleSetMessage("You already in this group", MessageType.ERROR);
    }
    const newMembers = [...result_group.members, user.email];

    await updateDoc(doc(db, "groups", result_group.id), {
      members: newMembers,
    });
    getGroups();
  };

  const getGroupById = async (id: string) => {
    const groupRef = doc(db, "groups", id);
    const groupSnapshot = await getDoc(groupRef);
    const group = groupSnapshot.data();
    if (!group) return null;
    const members = await getAllMembersUsername(group.members);
    setUserMap(members);
    setGroup({ ...group, id });
    return group;
  };

  const getAllMembersUsername = async (members: string[]) => {
    const usersRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersRef);
    const users = usersSnapshot.docs.map((doc: DocumentData) => {
      return { ...doc.data(), id: doc.id };
    });
    // map user displayName to members with an object, key is email and value is username

    const tempMap = new Map();

    users.forEach((user: { email: string; displayName: string }) => {
      if (members.includes(user.email)) {
        tempMap.set(user.email, user.displayName);
      }
    });
    return tempMap;
  };

  const value = {
    groups,
    group,
    userMap,
    createGroup,
    getGroupById,
    joinGroup,
    loading,
  };

  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
};

export default GroupProvider;
