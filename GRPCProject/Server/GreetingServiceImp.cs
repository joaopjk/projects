using Greet;
using Grpc.Core;

namespace Server;

public class GreetingServiceImp : GreetingService.GreetingServiceBase
{
    public override Task<GreetingResponse> Greet(GreetingRequest request, ServerCallContext context)
    {
        var result = $"Hello {request.Greeting.FirstName} {request.Greeting.LastName}";
        return Task.FromResult(new GreetingResponse() { Result = result });
    }
}