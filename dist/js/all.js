"use strict";$(document).ready(function(){$("#menu").on("click","a",function(t){t.preventDefault();var e=$(this).attr("href"),o=$(e).offset().top;$("body,html").animate({scrollTop:o},500)}),$("#menuFuter").on("click","a",function(t){t.preventDefault();var e=$(this).attr("href"),o=$(e).offset().top;$("body,html").animate({scrollTop:o},500)})});