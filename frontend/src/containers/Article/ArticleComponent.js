import React, { PureComponent } from 'react';

class ArticleComponent extends PureComponent {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }


    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <article className="post-wrap">
                    <header>
                        <a className="user-title" href="#">
                            <img className="user-pic" src="http://hyunjoolee.pythonanywhere.com/static/images/default/default.jpg" alt="프사" />
                            <span className="post-username">Administrator</span>
                        </a>
                        <span className="pull-right">
                            <input className="btn btn-success" type="submit" value="팔로우" name="4" />
                        </span>
                    </header>
                    <img src="https://s3.ap-northeast-2.amazonaws.com/codesquad-webapp-userprofile/DSC_0341.jpg" />
                    <div className="post-content">
                        <input type="button" className="like to-like" id="like-button" onclick="likeButton()" name="10" />
                        <input type="button" className="comment-icon" name="10" />
                        <p className="like-count" id="count-10">좋아요 여러개</p>
                        <input type="button" className="comment-more" name="10" value="댓글 더 보기" />
                        <span className="post-username">Administrator</span>
                        <span>쏘혜</span>
                        <div className="post-content comment-box">
                            <form className="comment-text-wrapping">
                                <textarea className="comment-text" placeholder="댓글을 달으라우..."></textarea>
                            </form>
                        </div>
                    </div>
                </article>
        );
    }
}

ArticleComponent.propTypes = {

};

export default ArticleComponent;