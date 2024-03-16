using System.ComponentModel;

namespace GraphQLApi.Data.Entities
{
    public enum PaymentType
    {
        [Description("Free course")]
        FREE,
        [Description("Paid course")]
        PAID
    }
}