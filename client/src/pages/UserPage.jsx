import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username, showToast]);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"} >
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!user && !loading) {
    return <h1>User not found</h1>;
  }

  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={10000}
        replies={404}
        postImg={"/post1.png"}
        postTitle={"Like, if you think Meta steal user data."}
      />
      <UserPost
        likes={1200}
        replies={481}
        postImg={"/post1.png"}
        postTitle={"Let's Talk about Threads."}
      />
      <UserPost
        likes={777}
        replies={777}
        postImg={"/post1.png"}
        postTitle={"Thala for a reason."}
      />
      <UserPost
        likes={999}
        replies={111}
        postImg={"/post1.png"}
        postTitle={"Meta gonna hit X very soon."}
      />
    </>
  );
};

export default UserPage;
