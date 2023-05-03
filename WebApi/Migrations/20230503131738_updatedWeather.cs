using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class updatedWeather : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Weathers_Airports_AirportId",
                table: "Weathers");

            migrationBuilder.DropIndex(
                name: "IX_Weathers_AirportId",
                table: "Weathers");

            migrationBuilder.DropColumn(
                name: "AirportId",
                table: "Weathers");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Created",
                table: "Weathers",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Created",
                table: "Weathers",
                type: "integer",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AddColumn<int>(
                name: "AirportId",
                table: "Weathers",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Weathers_AirportId",
                table: "Weathers",
                column: "AirportId");

            migrationBuilder.AddForeignKey(
                name: "FK_Weathers_Airports_AirportId",
                table: "Weathers",
                column: "AirportId",
                principalTable: "Airports",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
