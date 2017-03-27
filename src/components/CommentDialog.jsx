import { h, Component } from 'preact';
import {extend} from 'OpenSeadragon'
import Store from '../store/Store';
import Dispatcher from '../dispatcher/Dispatcher';
import { CHANGE_EVENT } from '../constants/events';
import { DRAW, MOVE } from '../constants/modes';
import { ACTIVITY_UPDATE, MODE_UPDATE, COMMENT_UPDATE, DELETE_UPDATE } from '../constants/actionTypes';

//import TreeSelect, { TreeNode, SHOW_PARENT } from 'rc-tree-select';

import DropdownMenu, { NestedDropdownMenu } from 'react-dd-menu';


export default class CommentDialog extends Component {

	toggle(){
      //this.setState({ open: !this.state.open });
      this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    getInitialState() {
        return {
            isOpen: true,
            styles: {
                'min-width':'300px',
                top: -1000,
                left: -1000,
            },
            isMenuOpen: false
        };
    }

    componentDidMount() {
        this.value = "";
        Store.addHandler(CHANGE_EVENT, () => {
            var ops = extend(this.getAbsoluteLocation())
            this.setState(ops);
            this.value = Store.getComment();
            this.length = Store.getLength();
            this.area = Store.getArea();
        });
    }

    componentWillReceiveProps(){

    }
	
	componentDidUpdate() {

	}

  close()  {
    this.setState({ isMenuOpen: false });
  };

  click(value){
    console.log('You clicked an item' + value);
  };

  clickItem(v){
      console.log(v.label);
      this.onOkClick(v.label);
  }


	render() {
        console.log("CommentDialog render");
        var labels = Store.getAnnotationLabel();
        var options = [];
        var li = [];
        var liSub = [];

        labels.forEach((item) => {
            options.push(<option>{item.label}</option>);
            if(item.sort <= 10000){
                li.push(<li><a href='#' onClick={this.clickItem.bind(this, item)}>{item.label}</a></li>);
            }else{
                liSub.push(<li><a href='#' onClick={this.clickItem.bind(this, item)}>{item.label}</a></li>);
            }
        });
		/*return (
				<div id="comment-dialog" class="popover" style="width:300px" open={open} style={this.state.styles}>
                    <select id="comment-value" style="width: 180px" placeholder="请选择标注信息" ref={c=>this.input=c}>
                        <option value="" disabled selected>请选择标注信息</option>
                        {options}
                    </select>
                    <button onClick={this.onOkClick.bind(this)}>保存</button>
                    <button onClick={this.onDeleteClick.bind(this)}>删除</button>
				</div>
		);*/
        

        var prop = this.getAbsoluteLocation();

        let menuOptions = {
            isOpen: this.state.isMenuOpen,
            close: this.close.bind(this),
            toggle: <button type="button" onClick={this.toggle.bind(this)}>{this.value!=""?this.value:"单击选择"}</button>,
            align: 'left',
            upwards: prop.upwards,
            size: 'sm',
            inverse: true,
        };
        const nestedProps = {
            toggle: <a href="#">其他&gt;</a>,
            animate: true,
        };
        
        console.log(menuOptions.isOpen);
        if(this.state.isOpen){

            return (
                <div id="comment-dialog" class="popover" style="width:300px" style={this.state.styles}>
                    <div style="padding:5px;">标注长度:{Math.round(this.length)}μm&nbsp;面积:{Math.round(this.area)}μm<sup>2</sup></div>
                    <div style="padding:5px;">标签:
                <DropdownMenu {...menuOptions}>
                    {li}
                    <NestedDropdownMenu {...nestedProps}>
                        {liSub}
                    </NestedDropdownMenu>
                    <li role="separator" className="separator" />
                     <li><a href="#" onClick={this.onDeleteClick.bind(this)}>删除</a></li>
                </DropdownMenu>
                </div>
                </div>
            )
        }else{
            return null;
        }
	}

    onOkClick(value) {
        console.log(value);
         if (Store.getMode() != DRAW) {
            Dispatcher.dispatch({
                type: COMMENT_UPDATE,
                comment:value, 
            });
        }
    }

    onDeleteClick() {
        if (Store.getMode() != DRAW) {
            Dispatcher.dispatch({
                type: DELETE_UPDATE,
            });
        }
    }

    getAbsoluteLocation()
    { 
        var id = Store.getSelected()
        if(id){
            var element = document.getElementById(id);
            var rc = element.getBoundingClientRect();
            var offsetTop = rc.top;
            var offsetLeft = rc.left;
            var offsetWidth = element.offsetWidth; 
            var offsetHeight = element.offsetHeight; 
            while( element = element.offsetParent ) 
            { 
                offsetTop += element.offsetTop; 
                offsetLeft += element.offsetLeft; 
            } 
            offsetTop -= 40;
            var upwardsPercent = offsetTop / rc.bottom;
            var upwards = false;
            if(upwardsPercent > 0.6){
                upwards = true;
            }

            var o = { absoluteTop: offsetTop, absoluteLeft: offsetLeft, 
                offsetWidth: offsetWidth, offsetHeight: offsetHeight }; 
            return {styles: {top: offsetTop, left: offsetLeft}, isOpen : true, upwards : upwards};
        }
        return {isOpen: false};
    }
}



// const dialogStyles = {
//   cursor: 'default',
//   // IE 9-10 fix
//   'background-color': 'rgba(0,0,0,0)',
// };

// const dialogProperties = {
//   xmlns: 'http://www.w3.org/2000/svg',
//   version: '1.1',
//   preserveAspectRatio: 'none',
//   viewBox: '0 0 10000 10000',
//   width: '100%',
//   height: '100%',
// };