import { Button } from "@/shared/ui/Button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hiddenIds, setHiddenIds] = useState<Set<number>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);

  const apiUrl = "http://jsonplaceholder.typicode.com/posts?_limit=10";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, []);

  const toggleHideView = (id: number) => {
    setHiddenIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleLeftButtonClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };

  const handleRightButtonClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === posts.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="mx-30 max-w-100 ">
      <div className="text-xl font-bold mb-4">Posts</div>
      <div className="relative flex items-center justify-between gap-8">
        <Button onClick={() => handleLeftButtonClick()}>Left Button</Button>
        <Button onClick={() => handleRightButtonClick()}>Right Button</Button>
      </div>
      <div className="mt-8 space-y-4">
        {currentIndex < posts.length && posts[currentIndex] ? (
          <div
            key={posts[currentIndex].id}
            className="mb-4 p-4 border rounded-xl max-w-100 absolute w-full z-10 bg-black overflow-hidden"
          >
            <div
              onClick={() => toggleHideView(posts[currentIndex].id)}
              className="flex justify-between items-start cursor-pointer"
            >
              <h2 className="text-xl font-bold mb-2">
                {posts[currentIndex].title}
              </h2>
              <div className="mt-2 flex items-start">
                {hiddenIds.has(posts[currentIndex].id) ? (
                  <AiOutlineArrowUp />
                ) : (
                  <AiOutlineArrowDown />
                )}
              </div>
            </div>
            <motion.p
              animate={{
                height: hiddenIds.has(posts[currentIndex].id) ? "auto" : 0,
                opacity: hiddenIds.has(posts[currentIndex].id) ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className={hiddenIds.has(posts[currentIndex].id) ? "" : "hidden"}
            >
              {posts[currentIndex].body}
            </motion.p>

            <div className="absolute bottom-0 right-4 text-sm text-gray-500 mb-2">
              {posts.indexOf(posts[currentIndex]) + 1} / {posts.length}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
