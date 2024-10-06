using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nobeless.api.Migrations
{
    /// <inheritdoc />
    public partial class secondMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "phoneNumber",
                table: "users",
                type: "nvarchar(max)",
                nullable: true,
                defaultValue: "dd");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "phoneNumber",
                table: "users");
        }
    }
}
