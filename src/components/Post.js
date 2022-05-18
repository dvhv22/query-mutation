import React from "react";


import UsePost from "../Hook/UsePost";
import {
    Box,
    Heading,
    Link,

    Text,

} from '@chakra-ui/react';


export default function Post({ postId, setPostId }) {
    const { status, data, error, isFetching } = UsePost(postId);

    return (
        <div>
            <div>
                <a onClick={() => setPostId(-1)} href="#">
                    Back
                </a>
            </div>
            {!postId || status === "loading" ? (
                "Loading..."
            ) : status === "error" ? (
                <span>Error: {error.message}</span>
            ) : (
                <>
                    <Box>
                        <h3>{data.title}</h3>
                        <div>
                            <p>{data.body}</p>
                        </div>
                        <div>{isFetching ? "Background Updating..." : " "}</div>

                    </Box>


                </>
            )}
        </div>
    );
}