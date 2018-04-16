import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { returnFormatedDate } from '../../helpers/utils'
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
        var article = this.props.article;
        return (
            <article className="post-wrap">
                    <header>
                        <a className="user-title" href="#">
                            <img className="user-pic" src={article.owner.profile.profilepic} alt={article.owner.profile.firstname} />
                            <span className="post-username">{article.owner.profile.firstname} {article.owner.profile.lastname}</span>
                            <span className="article-username">@{article.owner.username}</span>
                        </a>
                        <span className="pull-right">
                        <span className="article-username date">{returnFormatedDate(article.updatedAt)}</span>
                        </span>
                        
                    </header>
                    {article.feed.type === "image" ? <img src={article.feed.picture} /> : null}
                    <div className="post-content">
                        <p className="like-count heading" id="count-10">{article.feed.heading}</p>
                        <p className="like-count description" id="count-10">{article.feed.description}</p>
                        <input type="button" className="like to-like" id="like-button" name="10" />
                        <input type="button" className="comment-icon" name="10" />
                        <div className="post-content comment-box">
                            <form className="comment-text-wrapping">
                                <textarea className="comment-text" placeholder="type your comment...."></textarea>
                            </form>
                        </div>
                    </div>
                </article>
        );
    }
}

ArticleComponent.propTypes = {
    article:PropTypes.object.isRequired
};

export default ArticleComponent;