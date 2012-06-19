require 'sinatra/base'
require 'oauth'
require 'oauth/request_proxy/rack_request'

module Sinatra
  module Assessment
    # this is the entry action that Canvas (the LTI Tool Consumer) sends the
    # browser to when launching the tool.
    post "/assessment/start" do
      # first we have to verify the oauth signature, to make sure this isn't an
      # attempt to hack the planet
      begin
        signature = OAuth::Signature.build(request, :consumer_secret => $oauth_secret)
        signature.verify() or raise OAuth::Unauthorized
      rescue OAuth::Signature::UnknownSignatureMethod,
             OAuth::Unauthorized
        return %{unauthorized attempt. make sure you used the consumer key "#{$oauth_key}" and shared secret "#{$oauth_secret}"}
      end
    
      # make sure this is an assignment tool launch, not another type of launch.
      # only assignment tools support the outcome service, since only they appear
      # in the Canvas gradebook.
      unless params['lis_outcome_service_url'] && params['lis_result_sourcedid']
        return %{It looks like this LTI tool wasn't launched as an assignment, or you are trying to take it as a teacher rather than as a a student. Make sure to set up an external tool assignment as outlined <a target="_blank" href="https://github.com/instructure/lti_example">in the README</a> for this example.}
      end
    
      # store the relevant parameters from the launch into the user's session, for
      # access during subsequent http requests.
      # note that the name and email might be blank, if the tool wasn't configured
      # in Canvas to provide that private information.
      %w(lis_outcome_service_url lis_result_sourcedid lis_person_name_full lis_person_contact_email_primary).each { |v| session[v] = params[v] }
    
      # that's it, setup is done. now send them to the assessment!
      redirect to("/assessment")
    end
    
    def username
      session['lis_person_name_full'] || 'Student'
    end
    
    get "/assessment" do
      # first make sure they got here through a tool launch
      unless session['lis_result_sourcedid']
        return %{You need to take this assessment through Canvas.}
      end
    
      # now render a simple form the user will submit to "take the quiz"
      <<-HTML
      <html>
        <head>
          <meta charset="utf-8">
          <title>Demo LTI Assessment Tool</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="description" content="">
          <meta name="author" content="">
      
          <!-- Le styles -->
          <link href="/bootstrap/css/bootstrap.css" rel="stylesheet">
          <link href="/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
      
          <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
          <!--[if lt IE 9]>
            <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
          <![endif]-->
      
          <!-- Le fav and touch icons -->
          <link rel="shortcut icon" href="/bootstrap/ico/favicon.ico">
          <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/bootstrap/ico/apple-touch-icon-114-precomposed.png">
          <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/bootstrap/ico/apple-touch-icon-72-precomposed.png">
          <link rel="apple-touch-icon-precomposed" href="/bootstrap/ico/apple-touch-icon-57-precomposed.png">
        </head>
        <body>
        <div class="container">
          <div class="hero-unit" style="padding-top: 30px; padding-bottom: 30px;">
            <h1>Pick a Grade!</h1>
          </div>
          <div id="contents">
            <div class='row'>
              <span class='span8 offset2'>
                <form action="/assessment" method="post" class='well'>
                  <h2>Hi, #{username}.</h2>
                  <p>On a scale of <code>0.0</code> to <code>1.0</code>, how well would you say you did on this assessment?</p>
                  <div style="margin: 40px 10px 20px;">
                    <input name='score' type='text' class='span1' id='score' placeholder='##' style="height: auto; margin-bottom: auto;"/>
                    <input type='submit' value='Submit' class='btn btn-primary'/>
                    <p><em>If you want to enter an invalid score here, you can test how the LMS will reject it.</em></p>
                  </div>
                </form>
              </span>
            </div>
          </div>
        </div>
        </body>
      </html>
      HTML
    end
    
    # This is the action that the form submits to with the score that the student entered.
    # In lieu of a real assessment, that score is then just submitted back to Canvas.
    post "/assessment" do
      # obviously in a real tool, we're not going to let the user input their own score
      score = params['score']
      if !score || score.empty?
        redirect to("/assessment")
      end
    
      # now post the score to canvas. Make sure to sign the POST correctly with
      # OAuth 1.0, including the digest of the XML body. Also make sure to set the
      # content-type to application/xml.
      xml = %{
    <?xml version = "1.0" encoding = "UTF-8"?>
    <imsx_POXEnvelopeRequest xmlns = "http://www.imsglobal.org/lis/oms1p0/pox">
      <imsx_POXHeader>
        <imsx_POXRequestHeaderInfo>
          <imsx_version>V1.0</imsx_version>
          <imsx_messageIdentifier>12341234</imsx_messageIdentifier>
        </imsx_POXRequestHeaderInfo>
      </imsx_POXHeader>
      <imsx_POXBody>
        <replaceResultRequest>
          <resultRecord>
            <sourcedGUID>
              <sourcedId>#{session['lis_result_sourcedid']}</sourcedId>
            </sourcedGUID>
            <result>
              <resultScore>
                <language>en</language>
                <textString>#{score}</textString>
              </resultScore>
            </result>
          </resultRecord>
        </replaceResultRequest>
      </imsx_POXBody>
    </imsx_POXEnvelopeRequest>
      }
      consumer = OAuth::Consumer.new($oauth_key, $oauth_secret)
      token = OAuth::AccessToken.new(consumer)
      response = token.post(session['lis_outcome_service_url'], xml, 'Content-Type' => 'application/xml')
    
      headers 'Content-Type' => 'text'
      %{
      <html>
        <head>
          <meta charset="utf-8">
          <title>Demo LTI Assessment Tool</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="description" content="">
          <meta name="author" content="">
      
          <!-- Le styles -->
          <link href="/bootstrap/css/bootstrap.css" rel="stylesheet">
          <link href="/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
      
          <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
          <!--[if lt IE 9]>
            <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
          <![endif]-->
      
          <!-- Le fav and touch icons -->
          <link rel="shortcut icon" href="/bootstrap/ico/favicon.ico">
          <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/bootstrap/ico/apple-touch-icon-114-precomposed.png">
          <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/bootstrap/ico/apple-touch-icon-72-precomposed.png">
          <link rel="apple-touch-icon-precomposed" href="/bootstrap/ico/apple-touch-icon-57-precomposed.png">
        </head>
        <body>
        <div class="container">
          <div class="hero-unit" style="padding-top: 30px; padding-bottom: 30px;">
            <h1>Pick a Grade!</h1>
          </div>
          <div id="contents">
            <div class='row'>
              <span class='span12'>
                <h2>Your score has #{response.body.match(/\bsuccess\b/) ? "been posted" : "failed in posting"} to the LMS.</h2>
                The response was:
                  <pre>#{CGI.escapeHTML(response.body)}</pre>
              </span>
            </div>
          </div>
        </div>
        </body>
      </html>
      }
    end
    
  end 
  register Assessment
end