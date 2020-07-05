import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import { Gallery } from './Gallery';
import { CreatePostButton } from "./CreatePostButton"
import {
    GEOLOCATION_OPTIONS,
    POSITION_KEY,
    TOKEN_KEY,
    API_ROOT,
    AUTH_HEADER,
} from '../constants';
import '../styles/Home.css';

const { TabPane } = Tabs;


export class Home extends React.Component {
    state = {
        loadingGeolocation: false,
        loadingPosts: false,
        errorMessage: null,
        posts: [],
    }

    getGeolocation() {
        this.setState({
            loadingGeolocation: true,
            errorMessage: null,
        });
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onGeolocationSuccess,
                this.onGeolocationFailure,
                GEOLOCATION_OPTIONS,
            );
        } else {
            this.setState({
                loadingGeolocation: false,
                errorMessage: 'Your browser does not support geolocation.',
            });
        }
    }
    onGeolocationSuccess = (position) => {
        this.setState({
            loadingGeolocation: false,
            errorMessage: null,
        })
        console.log(position);
        //terminology: object destructuring
        const { latitude, longitude } = position.coords;
        localStorage.setItem(POSITION_KEY, JSON.stringify({ latitude, longitude }));
        this.loadNearbyPost();
    }

    onGeolocationFailure = () => {
        this.setState({
            loadingGeolocation: false,
            error: 'Failed to load geolocation.',
        })
    }

    loadNearbyPost() {
        this.setState({
            loadingPosts: true,
            errorMessage: null,
        });

        const position = JSON.parse(localStorage.getItem(POSITION_KEY));
        const range = 2000;
        const token = localStorage.getItem(TOKEN_KEY);


        fetch(`${API_ROOT}/search?lat=${position.latitude}&lon=${position.longitude}&range=${range}`, {
            method: 'GET',
            headers: {
                Authorization: `${AUTH_HEADER} ${token}`,
            },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to load posts.');
        }).then((data) => {
            console.log(data);
            this.setState({
                loadingPosts: false,
                posts: data ? data : [],
            });
        }).catch((error) => {
            this.setState({
                loadingPosts: false,
                errorMessage: error.message,
            });
        });

    }



    getImagePosts = () => {
      const { error, isLoadingGeoLocation, isLoadingPosts, posts } = this.state;
      // console.log("getImagePosts starts");
      if (error) {
         return <div>{error}</div>
       } else if(isLoadingGeoLocation) {
         return <Spin tip="Loading geo location..."/>
       } else if (isLoadingPosts) {
         return <Spin tip="Loading posts..." />
       } else if (posts.length > 0) {
         const images = this.state.posts.map((post) => {
           return {
             user: post.user,
             src: post.url,
             thumbnail: post.url,
             caption: post.message,
             thumbnailWidth: 400,
             thumbnailHeight: 300,
           }
         });

         return (<Gallery images={images}/>);
       } else {
         return 'No nearby posts.';
       }
       // console.log("getImagePosts ends");
     }


    componentDidMount() {
      console.log("componentDidMount");
      if (this.state.dataWasFetched) {
        console.log("getGeolocation before");
        this.getGeolocation();
        console.log("getGeolocation after");
      }
      // this.getGeolocation();
    }
    render() {
        const operations = <CreatePostButton />;
        // const operations = <Button>Create New Post</Button>;
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Image Posts" key="1">
                    {this.getImagePosts()}
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    Content of tab 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    Content of tab 3
                </TabPane>
            </Tabs>
        );
    }
};
