using Dummy;
using Grpc.Core;

const string Target = "127.0.0.1:5005";

var channel = new Channel(Target, ChannelCredentials.Insecure);

channel.ConnectAsync().ContinueWith(task =>
{
    if(task.Status == TaskStatus.RanToCompletion)
        Console.WriteLine("The client connect successfully!");
});

var client = new DummyService.DummyServiceClient(channel);

channel.ShutdownAsync().Wait();

Console.ReadKey();