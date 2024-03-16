using GraphQL.Types;
using GraphQLApi.Data.Entities;

namespace GraphQLApi.Types
{
    // public class PaymentTypeEnum : EnumerationGraphType<PaymentType> {}
    public class PaymentTypeEnum : EnumerationGraphType
    {
        public PaymentTypeEnum()
        {
            Name = "Payment type";
            Description = "Payment type for the course";
            Add("FREE", 0, "Free course");
            Add("PAID", 1, "Paid course");
        }
    }
}