using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nobeless.api.Migrations
{
    /// <inheritdoc />
    public partial class addverifiedonuser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isVerified",
                table: "users",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isVerified",
                table: "users");
        }
    }
}
