import './App.css';
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import { useState } from 'react';
import Post from './components/Post';
import PostsList from './components/PostsList';
import { Box } from '@chakra-ui/react';

function App() {
  const [postId, setPostId] = useState(-1);
  const queryClient = new QueryClient();

  return (
    <div className='App-header'>
      <QueryClientProvider client={queryClient}>

        {postId > -1 ? (
          <Post postId={postId} setPostId={setPostId} />
        ) : (
          <PostsList setPostId={setPostId} />
        )}
        {/* <ReactQueryDevtools initialIsOpen /> */}
      </QueryClientProvider>

    </div>

  );
}

export default App;
