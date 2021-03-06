import React from 'react';
import './style.less';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentState: this.props.data.commentState
    };
    this.showComment = this.showComment.bind(this);
    this.submitClickHandle = this.submitClickHandle.bind(this);
    this.hideComment = this.hideComment.bind(this);
    this.commentOK = this.commentOK.bind(this);
  }
  showComment () {
    this.setState({
      commentState: 1
    });
  }
  hideComment() {
    this.setState({
      commentState: 0
    });
  }
  submitClickHandle() {
    const submitComment = this.props.submitComment;
    const id = this.props.data.id;
    const commentTextDOM = this.refs.commentText;
    const value = commentTextDOM.value.trim();
    if(!value) {
      return;
    }
    submitComment(id, value, this.commentOK);
  }
  commentOK() {
    // 已经评价 修改状态
    this.setState({
      commentState: 2
    });
  }
  render() {
    const data = this.props.data;
    return (
      <div className="item">
        <div className="item-container">
          <div className="img">
            <img src={data.img} alt=""/>
          </div>
          <div className="content">
            <div className="title">商户：{data.title}</div>
            <div className="count">数量：{data.count}</div>
            <div className="price">价格：￥{data.price}</div>
            {
              this.state.commentState === 0 ?
                <button className="btn" onClick={this.showComment}>评价</button> : this.state.commentState === 2 ?
                  <button className="btn btn-selected">已评价</button> : ''
            }
          </div>
        </div>
        {
          this.state.commentState === 1 ?
            <div className="comment-text-container">
              <textarea ref="commentText" name="" id="" cols="30" rows="10" />
              <div>
                <button className="btn" onClick={this.submitClickHandle}>提交</button>
                <button className="btn btn-selected" onClick={this.hideComment}>取消</button>
              </div>
            </div> : ''
        }

      </div>
    );
  }
}