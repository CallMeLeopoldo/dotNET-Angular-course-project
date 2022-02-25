using System;

namespace API.Errors
{
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public ApiResponse(int statusCode, string message = null)
        {
            Message = message;
            StatusCode = statusCode;
            Message = message ?? GetDefaultStatusCodeMessage(statusCode);

        }

        private string GetDefaultStatusCodeMessage(int statusCode)
        {
            return statusCode switch
            {
                400 => "Ya can't even make a request, luv",
                401 => "Ya don't have auth, go get it",
                404 => "This resource was not found, fam",
                500 => "Gotta fix those errors. Y'haft to be the best version of yoself",
                _ => null

            };
        }
    }
}