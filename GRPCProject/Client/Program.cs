using Dummy;
using Greet;
using Grpc.Core;

const string Target = "127.0.0.1:5005";

var channel = new Channel(Target, ChannelCredentials.Insecure);

channel.ConnectAsync().ContinueWith(task =>
{
    if(task.Status == TaskStatus.RanToCompletion)
        Console.WriteLine("The client connect successfully!");
});

// var client = new DummyService.DummyServiceClient(channel);
var client = new GreetingService.GreetingServiceClient(channel);

var greeting = new Greeting
{
    FirstName = "João",
    LastName = "Sousa"
};
var request = new GreetingRequest { Greeting = greeting };

var respose = client.Greet(request);
Console.WriteLine(respose.Result);

channel.ShutdownAsync().Wait();

Console.ReadKey();