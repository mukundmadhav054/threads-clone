import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost likes={10000} replies={404} postImg={"/post1.png"} postTitle={"Like, if you think Meta steal user data."}/>
      <UserPost likes={1200} replies={481} postImg={"/post1.png"} postTitle={"Let's Talk about Threads."}/>
      <UserPost likes={777} replies={777} postImg={"/post1.png"} postTitle={"Thala for a reason."}/>
      <UserPost likes={999} replies={111} postImg={"/post1.png"} postTitle={"Meta gonna hit X very soon."}/>
    </>
  );
};

export default UserPage;
