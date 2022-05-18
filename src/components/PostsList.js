import React, { useEffect } from "react";
import { useState } from "react";

import UsePosts from "../Hook/UsePosts";
import { SimpleGrid, Box, Button, Text } from "@chakra-ui/react";

import {

    useMutation,
    QueryClient,

} from 'react-query';
import axios from "axios";


export default function PostsList({ setPostId }) {
    const [postsData, setPostsData] = useState([]);
    const [statusAddPost, setStatusAddPost] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const queryClient = new QueryClient();



    const { status, data, error, isFetching } = UsePosts();
    //console.log('check data update>>>', data);

    useEffect(() => {
        //dùng dể manage component state

        let dataCopy = data;
        setPostsData(dataCopy);
        //console.log(postsData);

    }, [postsData, data]);

    const addTodoMutation = useMutation(
        newPost => axios.post("https://jsonplaceholder.typicode.com/posts", newPost),
        {

            onMutate: async newPost => {

                await queryClient.cancelQueries('posts')

                const previousValue = queryClient.getQueryData('posts')

                queryClient.setQueryData('posts', old => ({
                    ...old,
                    // data: [...data, newPost],
                    data: data.unshift(newPost),

                }))

                return previousValue
            },

            onError: (err, variables, previousValue) =>
                queryClient.setQueryData('posts', previousValue),

            onSettled: () => {
                queryClient.invalidateQueries('posts')
            },
        }
    )
    const handleOnclick = () => {
        if (title && body) {
            let newPost = {
                title: title,
                body: body,
                userId: 1
            }
            //let res = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
            //console.log(res.data);
            // let copy = postsData;
            // copy.unshift(res.data);
            // setPostsData(copy);

            addTodoMutation.mutate(newPost);
            setStatusAddPost(false);
            setBody('');
            setTitle('');
            console.log(postsData);

        }



    }


    return (
        <div>
            <h1>Posts</h1>
            <button onClick={() => setStatusAddPost(!statusAddPost)}>Add more post</button><br />
            {statusAddPost &&
                <>

                    <label htmlFor="postTitle">Title:</label>
                    <input
                        type="text"
                        id="postTitle"
                        name="postTitle"
                        value={title}
                        onChange={e => setTitle(e.target.value)}

                    /><br />
                    <label htmlFor="postBody">Body:</label>
                    <textarea
                        id="postBody"
                        name="postBody"
                        value={body}
                        onChange={e => setBody(e.target.value)}

                    /><br />
                    {/* <button onClick={handleOnclick}>{addTodoMutation.isLoading ? 'Creating...' : 'Create'}</button> */}
                    <button onClick={handleOnclick}>Create</button>



                </>
            }



            <div>
                {status === "loading" ? (
                    "Loading..."
                ) : status === "error" ? (
                    <span>Error: {error.message}</span>
                ) : (
                    <>
                        <div>
                            <SimpleGrid minChildWidth='300px' spacing='50px'>

                                {postsData && postsData.map((post) => (
                                    <Box bg='#bbb8b8' height='200px' key={post.id} >
                                        <Text color='black' >
                                            {post.title}
                                        </Text>

                                        <Button colorScheme='teal' variant='ghost' onClick={() => setPostId(post.id)}>
                                            view details
                                        </Button>

                                    </Box>
                                ))}



                            </SimpleGrid>
                        </div>
                        <div>{isFetching ? "Background Updating..." : " "}</div>
                    </>
                )}
            </div>
        </div>
    );
}