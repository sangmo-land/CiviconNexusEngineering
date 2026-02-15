<?php

namespace App\Filament\Resources;

use App\Filament\Resources\QuoteRequestResource\Pages;
use App\Models\QuoteRequest;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\TextEntry;
use Filament\Tables;
use Filament\Tables\Table;

class QuoteRequestResource extends Resource
{
    protected static ?string $model = QuoteRequest::class;

    public static function getNavigationIcon(): ?string
    {
        return 'heroicon-o-document-currency-dollar';
    }

    public static function getNavigationSort(): ?int
    {
        return 1;
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function infolist(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Contact Information')
                    ->schema([
                        TextEntry::make('name'),
                        TextEntry::make('phone'),
                        TextEntry::make('email'),
                        TextEntry::make('city'),
                    ])
                    ->columns(2),
                
                Section::make('Project Details')
                    ->schema([
                        TextEntry::make('project_type')
                            ->badge(),
                        TextEntry::make('budget'),
                        TextEntry::make('message')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
                
                Section::make('Attachment')
                    ->schema([
                        TextEntry::make('attachment')
                            ->url(fn ($record) => $record->attachment ? asset('storage/' . $record->attachment) : null)
                            ->openUrlInNewTab()
                            ->placeholder('No attachment'),
                    ])
                    ->visible(fn ($record) => $record->attachment),
                
                Section::make('Metadata')
                    ->schema([
                        TextEntry::make('created_at')
                            ->label('Submitted At')
                            ->dateTime(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('phone')
                    ->searchable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable(),
                Tables\Columns\TextColumn::make('project_type')
                    ->badge()
                    ->searchable(),
                Tables\Columns\TextColumn::make('budget'),
                Tables\Columns\IconColumn::make('attachment')
                    ->boolean()
                    ->label('Has File')
                    ->trueIcon('heroicon-o-paper-clip')
                    ->falseIcon('heroicon-o-minus')
                    ->getStateUsing(fn ($record) => !empty($record->attachment)),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->label('Submitted'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('project_type')
                    ->options([
                        'Residential Construction' => 'Residential Construction',
                        'Commercial Construction' => 'Commercial Construction',
                        'Industrial Construction' => 'Industrial Construction',
                        'Road & Bridge Construction' => 'Road & Bridge Construction',
                        'Structural Engineering' => 'Structural Engineering',
                        'Renovation & Remodeling' => 'Renovation & Remodeling',
                        'Custom House Plan' => 'Custom House Plan',
                        'Site Planning' => 'Site Planning',
                        'Other' => 'Other',
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListQuoteRequests::route('/'),
            'view' => Pages\ViewQuoteRequest::route('/{record}'),
        ];
    }
}
