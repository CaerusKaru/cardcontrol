#
# This is an example VCL file for Varnish.
#
# It does not do anything by default, delegating control to the
# builtin VCL. The builtin VCL is called when there is no explicit
# return statement.
#
# See the VCL chapters in the Users Guide at https://www.varnish-cache.org/docs/
# and http://varnish-cache.org/trac/wiki/VCLExamples for more examples.

# Marker to tell the VCL compiler that this VCL has been adapted to the
# new 4.0 format.
vcl 4.0;
import std;
# Default backend definition. Set this to point to your content server.
backend default {
    .host ="127.0.0.1"; 
    .port = "8080";
}

sub vcl_recv {
    if ( req.method == "POST" || req.method == "PUT" ) {
        if ( req.url ~ "api/v1/card" ) {
            ban("req.url ~ api/v1/card");
        }
        if ( req.url ~ "api/v1/edited_card" ) {
            ban("req.url ~ api/v1/edited_card");
        }
        if ( req.url ~ "api/v1/access_point" ) {
            ban("req.url ~ api/v1/access_point");
	    ban("req.url ~ api/v1/resource");
	    ban("req.url ~ api/v1/domain");
	    ban("req.url ~ api/v1/user_account");
        }
        if( req.url ~ "api/v1/resource" ) {
            ban("req.url ~ api/v1/resource");
            ban("req.url ~ api/v1/domain");
        }
	if ( req.url ~ "api/v1/domain" ) {
            ban("req.url ~ api/v1/domain");
        }
        if ( req.url ~ "api/v1/request" ) {
            ban("req.url ~ api/v1/request");
        }

        return(pass);
    }

}

sub vcl_deliver {
    if (obj.hits > 0) {
        set resp.http.X-Cache = "HIT";
    } else {
        set resp.http.X-Cache = "MISS";
    }

}

sub vcl_backend_response {
    set beresp.ttl = 1w;
    set beresp.grace = 1m;
}

