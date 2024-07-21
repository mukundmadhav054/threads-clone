import { Avatar, Box, Flex, Text, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNowStrict } from "date-fns";

const Post = ({ post, postedBy }) => {
  const showToast = useShowToast();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${postedBy}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
        setUser(null);
      }
    };
    getUser();
  }, [postedBy, showToast]);

  return (
    <>
      <Link to={`/${user?.username}/post/${post._id}`}>
        <Flex gap={3} mb={4} py={5}>
          <Flex flexDir={"column"} alignItems={"center"}>
            <Avatar
              size={"md"}
              name={user?.name}
              src={user?.profilePicture}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/${user?.username}`);
              }}
            />
            <Box w={1} h={"full"} bg={"gray.light"} my={2}></Box>
            <Box position={"relative"} w={"full"}>
              {post.replies.length === 0 && (
                <Text textAlign={"center"}>🥱</Text>
              )}
              {post.replies[0] && (
                <Avatar
                  size={"xs"}
                  name={post.replies[0].name}
                  src={post.replies[0].userProfilePicture}
                  position={"absolute"}
                  top={"0px"}
                  left={"15px"}
                  padding={"2px"}
                />
              )}

              {post.replies[1] && (
                <Avatar
                  size={"xs"}
                  name={post.replies[1].name}
                  src={post.replies[1].userProfilePicture}
                  position={"absolute"}
                  bottom={"0px"}
                  right={"-5px"}
                  padding={"2px"}
                />
              )}

              {post.replies[2] && (
                <Avatar
                  size={"xs"}
                  name={post.replies[2].name}
                  src={post.replies[2].userProfilePicture}
                  position={"absolute"}
                  bottom={"0px"}
                  left={"4px"}
                  padding={"2px"}
                />
              )}
            </Box>
          </Flex>
          <Flex flex={1} flexDir={"column"} gap={2}>
            <Flex justifyContent={"space-between"} w={"full"}>
              <Flex w={"full"} alignItems={"center"}>
                <Text
                  fontSize={"sm"}
                  fontWeight={"bold"}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/${user?.username}`);
                  }}
                >
                  {user?.username}
                </Text>
                <Image src="/verified.png" w={4} h={4} m={1} />
              </Flex>
              <Flex gap={4} alignItems={"center"}>
                <Text
                  fontSize={"xs"}
                  w={36}
                  textAlign={"right"}
                  color={"gray.light"}
                >
                  {formatDistanceToNowStrict(new Date(post.createdAt))} ago
                </Text>
              </Flex>
            </Flex>
            <Text fontSize={"sm"}>{post.text}</Text>
            {post.img && (
              <Box
                borderRadius={6}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"gray.light"}
              >
                <Image src={post.img} w={"full"} />
              </Box>
            )}
            <Flex gap={3} my={1}>
              <Actions post={post} />
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </>
  );
};

export default Post;
