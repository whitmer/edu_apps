LTI Apps
---------------------------
This site is a collection of real-world and example apps that 
leverage LTI. There are examples of LTI tool providers that
offer a number of additional features,
including padding grades back to the LMS and adding a custom button
to a rich editor field.

### Running the Tool

To run this tool, download the git repository, then open a console
prompt in the repo directory.

First, if you don't already have Bundler installed, do that.

    $ gem install bundler

You may need to run this command as root depending on your ruby
configuration.

Next you'll want to install the necessary gems:

    $ bundle install

Now, just start it up:

    $ ruby -rubygems lti_example.rb

You will see some output like this:

    Sinatra/1.3.1 has taken the stage on 4567 for development with backup from WEBrick

That number is the port that the tool is running on (4567 is the default).

## Extensions

To access the example tools and extensions, fire up the server and
load the home page. Click "Coding" -> "Examples" for examples and
directions on how to set them up.
