var lti;
  var cache = {
    coursesFor: {},
    lecturesFor: {},
    categories: {},
    courses: {}
  };
(function() {
  var $breadcrumb = $("#breadcrumb");
  var $result = $("#result").detach().removeAttr('id');
  $("#results").on('click', '.lecture', function(event) {
    if($(event.target).hasClass('preview')) {
      return;
    }
    var lecture = $(this).data('lecture');
    selectVideo(lecture.id, lecture.title);
  });
  $("#breadcrumb").on('click', 'a', function(event) {
    event.preventDefault();
    loadCategory($(this).parent().attr('data-id'));
  });
  function loadCategories() {
    var url = "/youtube_edu_browse";
    $.ajax({
      url: url,
      success: function(data) {
        cache.subCategories = data;
        cache.categories.root = {
          title: "Categories",
          id: 'root'
        }
        loadCategory('root');
      },
      dataType: 'json'
    })
  }
  function loadCourse(id) {
    cache.currentCourseId = id;
    $("#normal_results,#smaller_results").empty();
    function ready() {
      $("#normal_results,#smaller_results").empty();
      var $lecturesHolder = $("#normal_results");
      var lectures = cache.lecturesFor[id];
      for(var idx in lectures) {
        var lecture = lectures[idx];
        var $lecture = $result.clone();
        $lecture.find(".title").text("(" + durationString(lecture.duration) + ") " + lecture.title);
        $lecture.find(".img").attr('src', lecture.thumbnail);
        $lecture.data('lecture', lecture);
        $lecture.addClass('lecture');
        $lecturesHolder.append($lecture.show());
      }
      breadcrumb();
    }
    if(cache.lecturesFor[id]) {
      ready();        
    } else {
      var url = "/youtube_edu_browse?course_id=" + id;
      $("#normal_results").html("&nbsp;&nbsp;&nbsp;&nbsp;Loading...");
      $.ajax({
        url: url,
        success: function(data) {
          cache.lecturesFor[id] = data
          if(cache.currentCourseId != id) {
            return;
          }
          ready();        
        },
        dataType: 'json'
      });
    }
  }
  function breadcrumb() {
    var category = cache.categories[cache.currentCategoryId];
    $breadcrumb.empty();
    var stack = [];
    if(cache.currentCourseId && cache.courses[cache.currentCourseId]) {
      var course = cache.courses[cache.currentCourseId];
      $breadcrumb.prepend("<li data-id='" + category.id + "'>" + course.title + "</li>");
      $breadcrumb.prepend("<li><span class='divider'> / </span></li>");
      $breadcrumb.prepend("<li data-id='" + category.id + "'><a href='#'>" + category.title + "</a></li>");
    } else {
      $breadcrumb.prepend("<li data-id='" + category.id + "'>" + category.title + "</li>");
    }
    stack.shift(category);
    while(category.parentId && cache.categories[category.parentId]) {
      category = cache.categories[category.parentId];
      $breadcrumb.prepend("<li><span class='divider'> / </span></li>");
      $breadcrumb.prepend("<li data-id='" + category.id + "'><a href='#'>" + category.title + "</a></li>");
    }
  }
  function loadCategory(id, previousId) {
    var category = cache.categories[id];
    if(id != "root") {
      cache.categories[id].parentId = cache.categories[id].parentId || previousId;
    }
    cache.currentCategoryId = id;
    cache.currentCourseId = null;
    var subCategories = cache.subCategories[id];
    $("#normal_results,#smaller_results").empty();
    var $categoriesHolder = $("#normal_results");
    if(id != "root") {
      $categoriesHolder = $("#smaller_results");
    }
    for(var idx in subCategories) {
      var subCategory = subCategories[idx];
      cache.categories[subCategory.id] = subCategory;
      var $sub = $result.clone();
      $sub.find(".title").text(subCategory.title);
      $sub.find(".img").attr('src', subCategory.thumbnail || "/playlist.png");
      $sub.addClass('category');
      $sub.data('category', subCategory);
      $sub.click(function() {
        var subCategory = $(this).data('category');
        console.log(subCategory);
        loadCategory(subCategory.id, id);
      });
      $categoriesHolder.append($sub.show());
    }
    breadcrumb();
    function ready() {
      if(cache.coursesFor[id]) {
        var $coursesHolder = $("#normal_results");
        for(var idx in cache.coursesFor[id]) {
          var course = cache.coursesFor[id][idx];
          cache.courses[course.id] = course;
          var $course = $result.clone();
          $course.find(".title").text(course.title);
          $course.find(".img").attr('src', course.thumbnail);
          $course.addClass('course');
          $course.data('course', course);
          $course.click(function() {
            var course = $(this).data('course');
            loadCourse(course.id);
          });
          $coursesHolder.append($course.show());
        }
      }
    }
    if(id != "root") {
      if(cache.coursesFor[id]) {
        ready();        
      } else {
        var url = "/youtube_edu_browse?category_id=" + id;
        $("#normal_results").html("&nbsp;&nbsp;&nbsp;&nbsp;Loading...");
        $.ajax({
          url: url,
          success: function(data) {
            cache.coursesFor[id] = data
            if(cache.currentCategoryId != id || cache.currentCourseId) {
              return;
            }
            $("#normal_results").empty();
            ready();        
          },
          dataType: 'json'
        });
      }
    } else {
      ready();
    }
  }
  loadCategories();
})();