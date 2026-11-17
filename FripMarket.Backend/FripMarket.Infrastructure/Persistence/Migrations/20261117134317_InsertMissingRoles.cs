using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FripMarket.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InsertMissingRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var seedDate = new DateTimeOffset(
                2026, 11, 17, 0, 0, 0, TimeSpan.Zero
            );

            migrationBuilder.InsertData(
                table: "roles",
                columns: new[]
                {
            "id",
            "name",
            "description",
            "created_at",
            "updated_at"
                },
                values: new object[,]
                {
            {
                new Guid("11111111-1111-1111-1111-111111111111"),
                "Admin",
                "System administrator",
                seedDate,
                seedDate
            },
            {
                new Guid("22222222-2222-2222-2222-222222222222"),
                "Client",
                "Client account",
                seedDate,
                seedDate
            },
            {
                new Guid("33333333-3333-3333-3333-333333333333"),
                "Seller",
                "Seller account",
                seedDate,
                seedDate
            }
                }
            );
        }
        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "roles",
                keyColumn: "id",
                keyValues: new object[]
                {
            Guid.Parse("11111111-1111-1111-1111-111111111111"),
            Guid.Parse("22222222-2222-2222-2222-222222222222"),
            Guid.Parse("33333333-3333-3333-3333-333333333333")
                }
            );
        }
    }
}
