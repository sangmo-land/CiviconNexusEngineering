<?php

namespace App\Filament\Resources\ProjectResource\RelationManagers;

use Filament\Actions;
use Filament\Forms\Components;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class ImagesRelationManager extends RelationManager
{
    protected static string $relationship = 'images';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Components\FileUpload::make('image_path')
                    ->label('Image')
                    ->image()
                    ->required()
->disk('public')
                    ->directory('projects')
                    ->visibility('public')
                    ->columnSpanFull(),
                Components\TextInput::make('caption')
                    ->maxLength(255)
                    ->columnSpanFull(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('image_path')
            ->columns([
                Tables\Columns\ImageColumn::make('image_path')
                    ->label('Image'),
                Tables\Columns\TextColumn::make('caption'),
            ])
            ->filters([])
            ->headerActions([
Actions\CreateAction::make(),
            ])
            ->actions([
Actions\EditAction::make(),
                Actions\DeleteAction::make(),
            ])
            ->bulkActions([
Actions\BulkActionGroup::make([
                Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
