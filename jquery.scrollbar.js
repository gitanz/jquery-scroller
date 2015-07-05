//jquery scrollbar -> plugin by anooz
var interval = null;
(function($){
	var ScrollbarModel = function ScrollStructure(){
			//we require 4 layers #scrollbar, #leftArrow, #rightArrow, #scrollArea, #scroller
			this.scrollBarAttr = {'id':"scrollbar",'unselectable':'on', 'class':'scrollbar'};
			this.leftArrowAttr = {'id':'leftArrow','class':'leftArrow','unselectable':'on'};
			this.rightArrowAttr = {'id':'rightArrow','class':'rightArrow','unselectable':'on'}
			this.scrollingAreaAttr = {'id':'scrollingArea', 'class':'scrollingArea'};
			this.scrollerAttr = {'id':'scroller', 'class':'scroller'};
		}
	var self = {
		_createScrollBarStructure:function(ScrollBar){
			$scrollbar = $("<div/>").attr(ScrollBar.scrollBarAttr);
			$leftArrow = $("<div/>").attr(ScrollBar.leftArrowAttr).append("&#9666;");
			$rightArrow = $("<div/>").attr(ScrollBar.rightArrowAttr).append("&#9656;");
			$scrollingArea = $("<div/>").attr(ScrollBar.scrollingAreaAttr);
			$scroller = $("<div/>").attr(ScrollBar.scrollerAttr);
			$scrollbar.append($leftArrow).append($scrollingArea.append($scroller)).append($rightArrow);
			$("body").append($scrollbar);
			return $scrollbar;
		},
		_setScrollBarConstraints:function($target, $scrollbar, ScrollBar){
			scrollWidth = $target[0].scrollWidth;
			clientWidth = $target[0].clientWidth;
			if(clientWidth<scrollWidth){
				$scrollbar.find("#"+ScrollBar.scrollerAttr.id).css({'width':(clientWidth/scrollWidth)*100+"%"});
			}
			else{
				$scrollbar.find("#"+ScrollBar.scrollerAttr.id).addClass("disabled");
				$scrollbar.find("#"+ScrollBar.leftArrowAttr.id).addClass("disabled");
				$scrollbar.find("#"+ScrollBar.rightArrowAttr.id).addClass("disabled");
			}
		},
		_processOnMouseClickScroll:function($target, $scrollbar, ScrollBar){
			flag = 0;
			$scrollbar.find("#"+ScrollBar.leftArrowAttr.id).mousedown(function(){
				interval = setInterval(function(){self._scrollAndCheckMouseUpOrLeave($target, $scrollbar, ScrollBar,"left")}, 2);
    		});
			$scrollbar.find("#"+ScrollBar.rightArrowAttr.id).mousedown(function(){
				interval = setInterval(function(){self._scrollAndCheckMouseUpOrLeave($target, $scrollbar, ScrollBar, "right")}, 2);
    		});
		},
		_scrollAndCheckMouseUpOrLeave:function($target, $scrollbar, ScrollBar, leftorright){
			if("right"==leftorright){
				if($scroller.offset().left+$scroller.outerWidth() < $rightArrow.offset().left){
					$($target[0]).scrollLeft($($target[0]).scrollLeft()+1);
					$scroller.css({'position':'inherit','left':$(scroller).offset().left+1});		
				}
				else{
					$rightArrow.addClass("disabled");
				}	
				$scrollbar.find("#"+ScrollBar.rightArrowAttr.id).mouseleave(function(){
					clearInterval(interval);
				});
				$scrollbar.find("#"+ScrollBar.rightArrowAttr.id).mouseup(function(){
					clearInterval(interval);
				});
			}else if("left"==leftorright){
				if($scroller.offset().left > $leftArrow.offset().left+$leftArrow.outerWidth()){
					$($target[0]).scrollLeft($($target[0]).scrollLeft()-1);
					$scroller.css({'position':'inherit','left':$(scroller).offset().left-1});		
				}
				else{
					$rightArrow.addClass("disabled");
				}
				$scrollbar.find("#"+ScrollBar.leftArrowAttr.id).mouseleave(function(){
					clearInterval(interval);
				});
				$scrollbar.find("#"+ScrollBar.leftArrowAttr.id).mouseup(function(){
					clearInterval(interval);
				});
			}
		}
	}
	$.extend($.fn, {
		scrollbar : function(){
			Model = new ScrollbarModel();
			$scrollbar = self._createScrollBarStructure(Model);
			self._setScrollBarConstraints($(this), $scrollbar, Model);
			self._processOnMouseClickScroll($(this),$scrollbar, Model);
		}
	});
}(jQuery))