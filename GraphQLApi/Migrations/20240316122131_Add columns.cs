using Microsoft.EntityFrameworkCore.Migrations;

namespace GraphQLApi.Migrations
{
    public partial class Addcolumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Courses_CourseID",
                table: "Ratings");

            migrationBuilder.RenameColumn(
                name: "CourseID",
                table: "Ratings",
                newName: "CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_Ratings_CourseID",
                table: "Ratings",
                newName: "IX_Ratings_CourseId");

            migrationBuilder.AddColumn<int>(
                name: "PaymentType",
                table: "Courses",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Courses_CourseId",
                table: "Ratings",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Courses_CourseId",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "PaymentType",
                table: "Courses");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "Ratings",
                newName: "CourseID");

            migrationBuilder.RenameIndex(
                name: "IX_Ratings_CourseId",
                table: "Ratings",
                newName: "IX_Ratings_CourseID");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Courses_CourseID",
                table: "Ratings",
                column: "CourseID",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
