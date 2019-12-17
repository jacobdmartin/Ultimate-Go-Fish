# # frozen_string_literal: true
#
# shared_context 'API' do
#   def api_get(url, params = {})
#     get "/api/#{url}", params: params, headers: headers.merge(basic_auth_header(person.email, ENV['APP_PASSWORD']))
#   end
#
#   def api_post(url, params = {})
#     post "/api/#{url}", params: params.to_json, headers: headers.merge(basic_auth_header(person.email, ENV['APP_PASSWORD']))
#   end
#
#   def api_put(url, params = {})
#     put "/api/#{url}", params: params.to_json, headers: headers.merge(basic_auth_header(person.email, ENV['APP_PASSWORD']))
#   end
#
#   def json_body
#     JSON.parse(response.body)
#   end
#
#   def xml_body
#     Nokogiri::XML(response.body)
#   end
#
#   def json_errors
#     json_body['errors']
#   end
#
#   def json_grouped_errors
#     json_body['grouped_errors']
#   end
#
#   def basic_auth_header(email, password)
#     { 'HTTP_AUTHORIZATION' => ActionController::HttpAuthentication::Basic.encode_credentials(email, password) }
#   end
#
#   def headers
#     {
#       'CONTENT_TYPE' => 'application/json',
#       'HTTP_ACCEPT' => 'application/json',
#       'HTTP_USER_AGENT' => 'Test Client'
#     }
#   end
# end
