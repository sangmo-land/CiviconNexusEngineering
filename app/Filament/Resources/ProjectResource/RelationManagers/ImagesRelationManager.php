<?php

namespace App\Filament\Resources\ProjectResource\RelationManagers;

use App\Models\ProjectImage;
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
                    ->imageEditor()
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
                    ->label('Image')
                    ->disk('public')
                    ->height(80)
                    ->width(120),
                Tables\Columns\TextColumn::make('caption')
                    ->placeholder('No caption')
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->reorderable('id')
            ->filters([])
            ->headerActions([
                Actions\CreateAction::make()
                    ->label('Add Image'),
                Actions\Action::make('bulk_upload')
                    ->label('Bulk Upload')
                    ->icon('heroicon-o-arrow-up-tray')
                    ->color('success')
                    ->form([
                        Components\FileUpload::make('images')
                            ->label('Select Images')
                            ->image()
                            ->multiple()
                            ->disk('public')
                            ->directory('projects')
                            ->visibility('public')
                            ->maxFiles(20)
                            ->columnSpanFull()
                            ->helperText('Select up to 20 images at once. You can add captions after uploading.'),
                    ])
                    ->action(function (array $data): void {
                        $paths = $data['images'] ?? [];
                        foreach ($paths as $path) {
                            $this->getOwnerRecord()->images()->create([
                                'image_path' => $path,
                                'caption' => null,
                            ]);
                        }
                    }),
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
