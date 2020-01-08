'use strict';
var globalWindowWidth = $(window).width();

// ==========================================================================
// Global Resize
// ==========================================================================
$(window).on('resize', function() {
  globalWindowWidth = $(window).width();
});