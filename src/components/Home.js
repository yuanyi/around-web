import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import { Gallery } from './Gallery';
import { AroundMap } from './AroundMap';
import { CreatePostButton } from "./CreatePostButton";
import {
    GEOLOCATION_OPTIONS,
    POSITION_KEY,
    TOKEN_KEY,
    API_ROOT,
    AUTH_HEADER,
    POST_TYPE_IMAGE,
    POST_TYPE_VIDEO,
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

    loadNearbyPost = (
      position = JSON.parse(localStorage.getItem(POSITION_KEY)),
      range = 20,
    ) => {
        this.setState({
            loadingPosts: true,
            errorMessage: null,
        });

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

    getPosts(type) {
      const { error, isLoadingGeoLocation, isLoadingPosts, posts } = this.state;
      // console.log("getImagePosts starts");
      if (error) {
         return <div>{error}</div>
       } else if(isLoadingGeoLocation) {
         return <Spin tip="Loading geo location..."/>
       } else if (isLoadingPosts) {
         return <Spin tip="Loading posts..." />
       } else if (posts.length > 0) {
         switch (type) {
           case POST_TYPE_IMAGE:
           return this.getImagePosts();
           case POST_TYPE_VIDEO:
           return this.getVideoPosts();
           default:
           throw new Error('unknown post type');
         }
       } else {
         return 'No nearby posts.';
       }
    }

    getImagePosts = () => {
      const images = this.state.posts
      .filter((post) => post.type === POST_TYPE_IMAGE)
      .map((post) => {
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
     }

     getVideoPosts = () => {
       const { posts } = this.state;
       <Row gutter={32}>
        {
          posts
            .filter((post) => [POST_TYPE_VIDEO, POST_TYPE_UNKNOWN].includes(post.type))
            .map((post) => (
              <Col span={6} key={post.url}>
                <video src={post.url} controls={true} className="video-block"/>
                <p>{post.user}: {post.message}</p>
              </Col>
            ))
        }
      </Row>
      }


    componentDidMount() {
      console.log("componentDidMount");
      /*
      if (this.state.dataWasFetched) {
        console.log("getGeolocation before");
        this.getGeolocation();
        console.log("getGeolocation after");
      }
      */
      this.getGeolocation();
    }
    render() {
        const operations = <CreatePostButton onSuccess={this.loadNearbyPost}/>;
        // const operations = <Button>Create New Post</Button>;
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Image Posts" key="1">
                    {this.getPosts(POST_TYPE_IMAGE)}
                </TabPane>
                <TabPane tab="Video Posts" key="2">
                    {this.getPosts(POST_TYPE_VIDEO)}
                </TabPane>
                <TabPane tab="Map" key="3">
                    <AroundMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `600px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    posts={this.state.posts}
                    loadPostsByTopic={this.loadPostsByTopic}
                    />
                </TabPane>
            </Tabs>
        );
    }
};
